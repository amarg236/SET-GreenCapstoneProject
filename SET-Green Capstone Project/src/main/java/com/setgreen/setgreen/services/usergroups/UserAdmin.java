package com.setgreen.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.RoleName;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.services.DayHandler;
import com.setgreen.setgreen.services.UserService;
import com.setgreen.setgreen.services.admin.DistrictHandler;
import com.setgreen.setgreen.services.implementation.GameHandler;
import com.setgreen.setgreen.services.implementation.RoleServiceImpl;
import com.setgreen.setgreen.services.implementation.SchoolHandler;
import com.setgreen.setgreen.util.DataObject;

/**
 * @author Brendon LeBaron
 * Should have (more or less) ultimate power over the system.
 *
 */
@Service
public class UserAdmin extends UserAssigner{
	@Autowired
	private GameHandler gh;
	
	@Autowired
	private UserService ur;
	
	@Autowired
	private DistrictHandler dh=new DistrictHandler();
	
	@Autowired
	private DayHandler dyh;
	
	@Autowired
	private SchoolHandler sh;
	@Autowired
	private RoleServiceImpl rr;
	@Autowired
	public UserAdmin() {super();};
	
	@Override
	public ResponseBody<User> inviteUser(SignUpForm suf, String a){
		return ur.saveUser(suf);
	}
	
	@Override
	public ResponseBody<User> removeUser(User u) {
		return stubbed(u);
	}

	@Override
	public ResponseBody<User> manageUser(User u) {
		return stubbed(u);
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
	@Override
	public RoleName getName() {
		return RoleName.ADMIN;
	}
}
