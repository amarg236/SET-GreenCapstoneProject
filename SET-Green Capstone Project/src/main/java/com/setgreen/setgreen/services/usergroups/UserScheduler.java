package com.setgreen.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.RoleName;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.BadDay;
import com.setgreen.setgreen.model.scheduling.IdealDay;
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
		return gh.saveGame(g);
	}

	@Override
	public ResponseBody<Long> approveGame(Long g) {
		return gh.acceptGame(g);
	}

	@Override
	public ResponseBody<Game> rejectGame(Game g) {
		return gh.rejectGame(g);
	}

	@Override
	public ResponseBody<Game> rescheduleGame(Game g) {
		return gh.RequestReschedule(g);
	}
	
	@Override
	public ResponseBody<BadDay> addBadDay(BadDay d) {
		return stubbed(d);
	}
	@Override
	public ResponseBody<BadDay> removeBadDay(BadDay d) {
		return stubbed(d);
	}

	@Override
	public ResponseBody<IdealDay> saveIdealDay(IdealDay d) {
		return stubbed(d);
	}

	@Override
	public ResponseBody<IdealDay> removeIdealDay(IdealDay d) {
		return stubbed(d);
	}
	@Override
	public ResponseBody<User> updateProfile(User u) {
		return ur.updateProfile(u);
	}

	@Override
	public ResponseBody<User> updatePassword(User u, User u2) {
		return ur.updatePassword(u, u);
	}
	
}
