package com.setgreen.setgreen.services.usergroups;

import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.RoleName;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.BadDay;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.model.scheduling.IdealDay;
import com.setgreen.setgreen.util.DataObject;
@Service
public class UserAssigner extends UserScheduler /*implements UserReference*/  {
	@Override
	public RoleName getName() {
		return RoleName.ASSIGNER;
	}
	
	@Override
	public ResponseBody<User> inviteUser(SignUpForm suf) {
		return stubbed(new User(suf));
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
		return uh.updateProfile(u);
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
	@Override
	public ResponseBody<BadDay> addBadDay(BadDay d) {
		return super.addBadDay(d);
	}
	@Override
	public ResponseBody<BadDay> removeBadDay(BadDay d) {
		return super.removeBadDay(d);
	}

	@Override
	public ResponseBody<IdealDay> saveIdealDay(IdealDay d) {
		return super.saveIdealDay(d);
	}

	@Override
	public ResponseBody<IdealDay> removeIdealDay(IdealDay d) {
		return super.removeIdealDay(d);
	}
}
