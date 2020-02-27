package com.setgreen.setgreen.services.usergroups;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.util.DataObject;

/**
 * @author Brendon LeBaron
 * Should have (more or less) ultimate power over the system.
 *
 */
public class UserAdmin extends UserAssigner implements UserReference{
	@Override
	public ResponseBody<User> inviteUser(SignUpForm suf, String a){
		return ur.saveUser(suf);
	}
	
	@Override
	public ResponseBody<User> removeUser(User u) {
		return UserReference.stubbed(u);
	}

	@Override
	public ResponseBody<User> manageUser(User u) {
		return UserReference.stubbed(u);
	}
	
	@Override
	public ResponseBody<Long> deleteGame(DataObject<Long> g) {
		return gh.deleteGame(g.getData());
		
	}
	
	@Override
	public ResponseBody<District> addDistrict(District d) {
		return dh.saveDistrict(d);
	}

	@Override
	public ResponseBody<District> removeDistrict(District d) {
		return dh.deleteDistrict(d);
	}
}
