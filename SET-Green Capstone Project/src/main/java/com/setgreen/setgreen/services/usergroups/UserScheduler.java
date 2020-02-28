package com.setgreen.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
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
@Service
public class UserScheduler extends UserUnfound {
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
	public UserScheduler(){super();};
	
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
	public ResponseBody<User> updateProfile(User u) {
		return ur.updateProfile(u);
	}

	@Override
	public ResponseBody<User> updatePassword(User u, String h) {
		return ur.updatePassword(u, h);
	}
	@Override
	public RoleName getName() {
		return RoleName.USER;
	}
}
