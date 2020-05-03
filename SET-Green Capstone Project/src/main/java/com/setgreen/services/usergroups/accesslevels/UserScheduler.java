package com.setgreen.services.usergroups.accesslevels;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.RoleName;
import com.setgreen.model.Teams;
import com.setgreen.model.User;
import com.setgreen.model.scheduling.BadDay;
import com.setgreen.model.scheduling.EventDay;
import com.setgreen.model.scheduling.IdealDay;
import com.setgreen.services.usergroups.GameConflictObj;
import com.setgreen.util.DataObject;
import com.setgreen.model.Role;
@Service
public class UserScheduler extends UserUnfound {

	@Autowired
	public UserScheduler(){super();};
	@Override
	public RoleName getName() {
		return RoleName.USER;
	}
	
	//method that does the main creategame logic as applied to everyone currently
	//future roles may need different implementation, this allows them to overwrite it
	//or do logic in the main createGame method.
	protected ResponseBody<Game> _createGame(Authentication auth, Game g) {
		if(g.getTime().getTime() < new Date().getTime()) {
			return new ResponseBody<Game>(HttpStatus.CONFLICT.value(), "Can't schedule a game in the past.", g);
		}
		g.setApproved(false);
		g.setAwayAccepted(false);
		g.setRejected(false);
		g.setUAcceptor(null);
		g.setUApprover(null);
		g.setURequester(auth.getName());
		g.setHomeNotification(false);
		g.setAwayNotification(true);
		HashSet<Game> sog = new HashSet<Game>(); //set of games. Prevents dupes by being a set
		sog.addAll(gh.getGamesByAllTeamIds(g).getResult()); //all awayteam games for awayteam of proposed game
		GameConflictObj gco = new GameConflictObj();
		for(Game gme : sog) { //for each game
			try {
				if(gme.getTime().getTime() < 1 || gme.getDuration() < 1) {
					throw new Exception("Duration or time to short");
				}
				if(gme.getTime().getTime() - g.durationAsMSecs() <= g.getTime().getTime() && gme.getTime().getTime()+gme.durationAsMSecs() >= g.getTime().getTime()) {
					gco.addTimeConflict(g);
				}
			}
			catch(Exception e) {
				gh.deleteGame(gme.getId());
			}
			
		}
		
		if(gco.didConflict()) { //if more that 0 conflicts
			return new ResponseBody<Game>(HttpStatus.CONFLICT.value(), gco.display(), g); //tell error
		}
		else {
			return gh.saveGame(g); //save game as expected
		}
	}

	@Override
	public ResponseBody<Game> createGame(Authentication auth, Game g){
		Iterable<EventDay> days = dyh.findEventDays().getResult();
		for(EventDay d : days) {
			//if (gameTime >= startOfEvent AND gameTime <= endOfEvent)
			//OR (gameEndTime >= startOfEven AND gameEndTime <= endOfEvent+LenghtOfGame
			if( (g.getTime().getTime() >= d.getDte().getTime() && g.getTime().getTime() <= d.getEndDate().getTime())
					|| (g.getTime().getTime()+g.durationAsMSecs() >= d.getDte().getTime() && g.getTime().getTime()+g.durationAsMSecs() <= d.getEndDate().getTime()+g.durationAsMSecs())) {
				return new ResponseBody<Game>(HttpStatus.CONFLICT.value(), "Event Conflict on: " + d.getDte() + " to " + d.getEndDate() + " Reason: " + d.getReason(), g);
			}
		}
		return _createGame(auth, g);
	}
	
	@Override
	public ResponseBody<Long> approveGame(Authentication auth, Long g) {
		return gh.teamVerifyGame(auth, g);
	}

	@Override
	public ResponseBody<Game> rejectGame(Authentication auth, Game g) {
		return gh.rejectGame(auth, g, false);
	}

	@Override
	public ResponseBody<Long> deleteGame(DataObject<Long> d){
		try {
			Game fg = gh.getGameById(d);
			if(!fg.isAwayAccepted()) {
				return gh.deleteGame(d.getData());
			}
			else if(fg.isApproved()) {
				return new ResponseBody<Long>(HttpStatus.CONFLICT.value(), "Game is already approved, contact an assignor", d.getData());
			}
			else {
				return new ResponseBody<Long>(HttpStatus.CONFLICT.value(), "Game is already accepted by opposing team, contact an assignor", d.getData());
			}
		}
		catch(NullPointerException e) {
			return new ResponseBody<Long>(HttpStatus.ACCEPTED.value(), "Did not find this game within the database", d.getData());
		}
	}
	
	@Override
	public ResponseBody<Game> rescheduleGame(Authentication auth, Game g) {
		Game ng = gh.getGameById(g.getId());
		ng.setDuration(g.getDuration());
		ng.setTime(g.getTime());
		if(!g.getURequester().equals(auth.getName())) { //XXX there's a surprise feature here where coach A from school 1 makes a game, and coach B from school 1 reschedules it, causing it to show up as rescheduled but removing it is non-critical
			ng.setHomeNotification(true);
			ng.setHasBeenEdited(true);
		}
		if(!ng.isAwayAccepted()) {
			return gh.modifyGame(ng);
		}
		else if(ng.isApproved()) {
			return new ResponseBody<Game>(HttpStatus.CONFLICT.value(), "Game is already approved, contact an assignor", ng);
		}
		else {
			return new ResponseBody<Game>(HttpStatus.CONFLICT.value(), "Game is already accepted by opposing team, contact an assignor", ng);
		}
	}
	
	@Override
	public ResponseBody<BadDay> addBadDay(BadDay d) {
		return dyh.saveBadDay(d);
	}
	@Override
	public ResponseBody<BadDay> removeBadDay(BadDay d) {
		return dyh.deleteBadDay(d);
	}

	@Override
	public ResponseBody<IdealDay> saveIdealDay(IdealDay d) {
		return dyh.saveIdealDay(d);
	}

	@Override
	public ResponseBody<IdealDay> removeIdealDay(IdealDay d) {
		return dyh.deleteIdealDay(d);
	}
	@Override
	public ResponseBody<User> updateProfile(User u) {
		return uh.updateProfile(u);
	}

	@Override
	public ResponseBody<User> updtePassword(User u, User u2) {
		return uh.updatePassword(u, u);
	}
	
	@Override
	public ResponseBody<Game> validateRejection(Authentication auth, Game gm) {
		Game g = gh.getGameById(gm.getId());
		Iterable<Role> LoR = rh.findByEmail(auth.getName());
		for(Role x : LoR) {
			Set<Teams> tms = x.getSchool().getTeams();
			for(Teams y : tms) {
				if(y.getTmName().equals(g.getHometeam())) {
					return gh.validateRejection(g, true);
				}
				else if(y.getTmName().equals(g.getAwayteam())) {
					return gh.validateRejection(g, false);
				}
			}
		}
		return new ResponseBody<Game>(HttpStatus.BAD_REQUEST.value(), "Failed to handle notification", gm);
	}
	
	@Override
	public ResponseBody<Game> validateModify(Authentication auth, Game gm) {
		Game g = gh.getGameById(gm.getId());
		Iterable<Role> LoR = rh.findByEmail(auth.getName());
		for(Role x : LoR) {
			Set<Teams> tms = x.getSchool().getTeams();
			for(Teams y : tms) {
				if(y.getTmName().equals(g.getHometeam())) {
					return gh.validateModify(g);
				}
			}
		}
		return new ResponseBody<Game>(HttpStatus.BAD_REQUEST.value(), "Failed to handle notification", gm);
	}
}
