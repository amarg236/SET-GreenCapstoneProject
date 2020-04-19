package com.setgreen.services.usergroups;

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
		return gh.saveGame(g);
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
