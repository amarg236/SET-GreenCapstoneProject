package com.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.RoleName;
import com.setgreen.model.User;
import com.setgreen.model.scheduling.BadDay;
import com.setgreen.model.scheduling.IdealDay;
import com.setgreen.util.DataObject;
@Service
public class UserScheduler extends UserUnfound {

	@Autowired
	public UserScheduler(){super();};
	@Override
	public RoleName getName() {
		return RoleName.USER;
	}
	@Override
	public ResponseBody<Game> createGame(Game g) {
		g.setApproved(false);
		g.setAwayAccepted(false);
		return gh.saveGame(g);
	}

	@Override
	public ResponseBody<Long> approveGame(Long g) {
		return gh.teamVerifyGame(g);
	}

	@Override
	public ResponseBody<Game> rejectGame(Game g) {
		return gh.rejectGame(g);
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
	public ResponseBody<Game> rescheduleGame(Game g) {
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
		return stubbed(u);//uh.updateProfile(u);
	}

	@Override
	public ResponseBody<User> updatePassword(User u, User u2) {
		return uh.updatePassword(u, u);
	}
	
}
