package com.setgreen.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.RoleName;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.Teams;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.BadDay;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.model.scheduling.IdealDay;
import com.setgreen.setgreen.util.DataObject;
@Service
public class UserUnfound extends UserReference {
	
	@Autowired
	public UserUnfound() {super();};
	@Override
	public RoleName getName() {
		return RoleName.UNFOUND;
	}
	@Override
	public ResponseBody<User> inviteUser(SignUpForm u) {
		return forbiddenAccess(new User(u));
	}

	@Override
	public ResponseBody<User> removeUser(User u) {
		return forbiddenAccess(u);
	}
	
	@Override
	public ResponseBody<User> verifyUser(User u){
		return forbiddenAccess(u);
	}
	
	@Override
	public ResponseBody<User> manageUser(User u) {
		return forbiddenAccess(u);
	}

	@Override
	public ResponseBody<Game> createGame(Game g) {
		return forbiddenAccess(g);
	}

	@Override
	public ResponseBody<Long> approveGame(Long g) {
		return forbiddenAccess(g);
	}

	@Override
	public ResponseBody<Game> rejectGame(Game g) {
		return forbiddenAccess(g);
	}

	@Override
	public ResponseBody<Game> rescheduleGame(Game g) {
		return forbiddenAccess(g);
	}

	@Override
	public ResponseBody<Long> deleteGame(DataObject<Long> id) {
		return forbiddenAccess(id.getData());
	}

	@Override
	public ResponseBody<District> addDistrict(District d) {
		return forbiddenAccess(d);
	}

	@Override
	public ResponseBody<District> removeDistrict(District d) {
		return forbiddenAccess(d);
	}

	@Override
	public ResponseBody<School> addSchool(School s) {
		return forbiddenAccess(s);
	}

	@Override
	public ResponseBody<School> removeSchool(School s) {
		return forbiddenAccess(s);
	}

	@Override
	public ResponseBody<EventDay> addEventDay(EventDay d) {
		return forbiddenAccess(d);
	}

	@Override
	public ResponseBody<EventDay> removeEventDay(EventDay d) {
		return forbiddenAccess(d);
	}

	@Override
	public ResponseBody<User> updateProfile(User u) {
		return forbiddenAccess(u);
	}

	@Override
	public ResponseBody<User> updatePassword(User u, User u2) {
		return forbiddenAccess(u);
	}

	@Override
	public ResponseBody<Teams> addTeam(Teams t) {
		return forbiddenAccess(t);
	}

	@Override
	public ResponseBody<Teams> removeTeam(Teams t) {
		return forbiddenAccess(t);
	}
	@Override
	public ResponseBody<BadDay> addBadDay(BadDay d) {
		return forbiddenAccess(d);
	}

	@Override
	public ResponseBody<BadDay> removeBadDay(BadDay d) {
		return forbiddenAccess(d);
	}

	@Override
	public ResponseBody<IdealDay> saveIdealDay(IdealDay d) {
		return forbiddenAccess(d);
	}

	@Override
	public ResponseBody<IdealDay> removeIdealDay(IdealDay d) {
		return forbiddenAccess(d);
	}

}
