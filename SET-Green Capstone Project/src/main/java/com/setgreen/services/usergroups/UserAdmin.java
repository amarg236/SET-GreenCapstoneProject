package com.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.model.District;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.RoleName;
import com.setgreen.model.SignUpForm;
import com.setgreen.model.User;
import com.setgreen.model.noticeboard.Notice;

/**
 * @author Brendon LeBaron
 * Should have (more or less) ultimate power over the system.
 *
 */
@Service
public class UserAdmin extends UserAssignor{
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
		return uh.deleteUser(u);
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
