package com.setgreen.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.RoleName;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.BadDay;
import com.setgreen.setgreen.model.scheduling.IdealDay;
import com.setgreen.setgreen.util.DataObject;
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
			else if(!fg.isApproved()) {
				return stubbed(d.getData());
			}
			else {
				return stubbed(d.getData());
			}
		}
		catch(NullPointerException e) {
			return new ResponseBody<Long>(HttpStatus.ACCEPTED.value(), "Did not find this game within the database", d.getData());
		}
	}
	
	@Override
	public ResponseBody<Game> rescheduleGame(Game g) {
		return stubbed(g);//gh.RequestReschedule(g);
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
