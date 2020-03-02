package com.setgreen.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.RoleName;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.util.DataObject;

/**
 * @author Brendon LeBaron
 * Should have (more or less) ultimate power over the system.
 *
 */
@Service
public class UserAdmin extends UserAssigner{
	@Override
	public RoleName getName() {
		return RoleName.ADMIN;
	}
	@Autowired
	public UserAdmin() {super();};
	
	@Override
	public ResponseBody<User> inviteUser(SignUpForm suf){
		return uh.saveUser(suf);
	}
	
	@Override
	public ResponseBody<User> removeUser(User u) {
		return stubbed(u);
	}
	
	@Override
	public ResponseBody<User> verifyUser(User u){
		return stubbed(u);
	}
	
	@Override
	public ResponseBody<User> manageUser(User u) {
		return stubbed(u);//uh.updateProfile(u);
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