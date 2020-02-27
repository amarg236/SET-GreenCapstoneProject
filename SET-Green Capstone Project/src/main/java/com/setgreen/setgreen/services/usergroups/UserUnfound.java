package com.setgreen.setgreen.services.usergroups;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.util.DataObject;

public class UserUnfound implements UserReference {

	@Override
	public ResponseBody<User> inviteUser(SignUpForm u, String a) {
		return UserReference.forbiddenAccess(new User(u));
	}

	@Override
	public ResponseBody<User> removeUser(User u) {
		return UserReference.forbiddenAccess(u);
	}

	@Override
	public ResponseBody<User> manageUser(User u) {
		return UserReference.forbiddenAccess(u);
	}

	@Override
	public ResponseBody<Game> createGame(Game g) {
		return UserReference.forbiddenAccess(g);
	}

	@Override
	public ResponseBody<Long> approveGame(Long g) {
		return UserReference.forbiddenAccess(g);
	}

	@Override
	public ResponseBody<Game> rejectGame(Game g) {
		return UserReference.forbiddenAccess(g);
	}

	@Override
	public ResponseBody<Game> rescheduleGame(Game g) {
		return UserReference.forbiddenAccess(g);
	}

	@Override
	public ResponseBody<Long> deleteGame(DataObject<Long> id) {
		return UserReference.forbiddenAccess(id.getData());
	}

	@Override
	public ResponseBody<District> addDistrict(District d) {
		return UserReference.forbiddenAccess(d);
	}

	@Override
	public ResponseBody<District> removeDistrict(District d) {
		return UserReference.forbiddenAccess(d);
	}

	@Override
	public ResponseBody<School> addSchool(School s) {
		return UserReference.forbiddenAccess(s);
	}

	@Override
	public ResponseBody<School> removeSchool(School s) {
		return UserReference.forbiddenAccess(s);
	}

	@Override
	public ResponseBody<EventDay> addEventDay(EventDay d) {
		return UserReference.forbiddenAccess(d);
	}

	@Override
	public ResponseBody<EventDay> removeEventDay(EventDay d) {
		return UserReference.forbiddenAccess(d);
	}

	@Override
	public ResponseBody<User> updateProfile(User u) {
		return UserReference.forbiddenAccess(u);
	}

	@Override
	public ResponseBody<User> updatePassword(User u, String h) {
		return UserReference.forbiddenAccess(u);
	}

}
