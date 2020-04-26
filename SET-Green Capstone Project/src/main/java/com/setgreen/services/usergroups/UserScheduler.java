package com.setgreen.services.usergroups;

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
import com.setgreen.model.scheduling.IdealDay;
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
	@Override
	public ResponseBody<Game> createGame(Authentication auth, Game g) {
		g.setApproved(false);
		g.setAwayAccepted(false);
		g.setRejected(false);
		g.setUAcceptor(null);
		g.setUApprover(null);
		g.setURequester(auth.getName());
		g.setHomeNotification(false);
		g.setAwayNotification(true);
		HashSet<Game> sog = new HashSet<Game>(); //set of games. Prevents dupes by being a set
		Teams s = new Teams(); //temp team object for methods
		s.setId(g.getHometeamId()); //hometeam as team
		sog.addAll(gh.getGames(s, true).getResult()); //all hometeam games for hometeam of proposed game
		s.setId(g.getAwayteamId()); //awayteam as team
		sog.addAll(gh.getGames(s, true).getResult()); //all awayteam games for awayteam of proposed game
		int conflictCount = 0; //count of all conflicts
		String conflicts = ""; //string of conflicting games
		for(Game gme : sog) { //for each game
			//if the games starting time is <= your proposed time and the end time is >=, it's a conflict
			//by virtue of OTHER GAME START is before MY GAME START and OTHER GAME END is after MY GAME START
			//meaning that g starts after gme and gme ends after g
			if(gme.getTime().getTime() <= g.getTime().getTime() && gme.getTime().getTime()+gme.getDuration() >= g.getTime().getTime()) { 																
				conflictCount++; //increment conflicts
				conflicts = conflicts + "\n" + gme.getHometeam() + " vs. " + gme.getAwayteam() + " at " + gme.getLocation(); //nextline hometeam vs awayteam at location
			}
		}
		conflicts = conflictCount + " conflicts found:" + conflicts; //"X conflicts found:\n hometeam vs. awayteam at location\n..."
		if(conflictCount > 0) { //if more that 0 conflicts
			return new ResponseBody<Game>(HttpStatus.CONFLICT.value(), conflicts, g); //tell error
		}
		else {
			return gh.saveGame(g); //save game as expected
		}
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
}
