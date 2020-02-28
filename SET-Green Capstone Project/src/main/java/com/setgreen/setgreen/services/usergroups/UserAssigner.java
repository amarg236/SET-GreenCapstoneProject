package com.setgreen.setgreen.services.usergroups;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Role;
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
@Service
public class UserAssigner extends UserScheduler /*implements UserReference*/  {
	@Override
	public RoleName getName() {
		return RoleName.ASSIGNER;
	}
	@Autowired
	public UserAssigner() {super();};
	@Autowired
	private GameHandler gh;
	
	@Autowired
	private UserService ur;
	
	@Autowired
	private DistrictHandler dh;
	
	@Autowired
	private DayHandler dyh;
	
	@Autowired
	private SchoolHandler sh;
	@Autowired
	private RoleServiceImpl rr;
	private boolean validate(Set<Role> r, SignUpForm suf) {
		for(Role x : r) {
			if(x.getDistrictName().equals(suf.getRole().getDistrictName())) {
				if(x.getRole().userLevel() > suf.getRole().getRole().userLevel()) {
					return true;
				}
			}
		}
		return false;
	}
	
	@Override
	public ResponseBody<User> inviteUser(SignUpForm suf, String a) {
		//XXX TEST no idea if this will work
		//ALSO this might be made pointless by the user checks that getrole does.
		//check that.
		if(validate(ur.getByToken(a).getRoles(), suf)) {
			return ur.saveUser(suf);
		}
		else {
			return super.inviteUser(suf, a);
		}
	}
	
	@Override
	public ResponseBody<User> removeUser(User u) {
		return stubbed(u);
	}

	@Override
	public ResponseBody<User> manageUser(User u) {
		return ur.updateProfile(u);
	}
	@Override
	public ResponseBody<Long> approveGame(Long g){
		return gh.verifyGame(g);
	}
	@Override
	public ResponseBody<Long> deleteGame(DataObject<Long> g) {
		return stubbed(g.getData());
	}
	
	@Override
	public ResponseBody<District> addDistrict(District d) {
		return stubbed(d);
	}

	@Override
	public ResponseBody<District> removeDistrict(District d) {
		return stubbed(d);
	}

	@Override
	public ResponseBody<School> addSchool(School s) {
		return sh.addSchool(s);
	}

	@Override
	public ResponseBody<School> removeSchool(School s) {
		return sh.deleteSchool(s);
	}

	@Override
	public ResponseBody<EventDay> addEventDay(EventDay d) {
		return dyh.saveEventDay(d);
	}

	@Override
	public ResponseBody<EventDay> removeEventDay(EventDay d) {
		return dyh.deleteEventDay(d);
	}
}
