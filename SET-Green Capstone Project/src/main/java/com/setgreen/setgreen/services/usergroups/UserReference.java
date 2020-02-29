package com.setgreen.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.setgreen.setgreen.services.AdminControlService;
import com.setgreen.setgreen.services.DayHandler;
import com.setgreen.setgreen.services.UserService;
import com.setgreen.setgreen.services.admin.DistrictHandler;
import com.setgreen.setgreen.services.implementation.GameHandler;
import com.setgreen.setgreen.services.implementation.RoleServiceImpl;
import com.setgreen.setgreen.services.implementation.SchoolHandler;
import com.setgreen.setgreen.services.implementation.TeamsServiceImpl;
import com.setgreen.setgreen.util.DataObject;
@Service
public abstract class UserReference {
	
	public UserReference() {
//		gh = new GameHandler();
//		ur = new UserServiceImpl();
//		dh = new DistrictHandler();
//		dyh = new DayHandlerImpl();
//		sh = new SchoolHandler();
//		rr = new RoleServiceImpl();
	};
	
	@Autowired
	public GameHandler gh;
	@Autowired
	public UserService ur;
	@Autowired
	public DistrictHandler dh;
	@Autowired
	public DayHandler dyh;
	@Autowired
	public SchoolHandler sh;
	@Autowired
	public RoleServiceImpl rr;
	@Autowired
	public TeamsServiceImpl th;
	@Autowired
	public AdminControlService ah;
	/**
	 * @return rolename associated with this class
	 */
	public abstract RoleName getName();
	
	/** Response for when you don't have the access to a method, throws your parameters back at you
	 */
	public <T> ResponseBody<T> forbiddenAccess(T obj){
		return new ResponseBody<T>(HttpStatus.FORBIDDEN.value(), "disallowed", obj);
	}
	
	/** Throws your parameters back at you and tells you that I'm lazy.
	 */
	public <T> ResponseBody<T> stubbed(T obj){
		return new ResponseBody<T>(HttpStatus.NOT_IMPLEMENTED.value(), "Not yet implemented", obj);
	}
	/** for assignor+, invite user of lower tier (equal in admin case)
	 * @param u User to create
	 * @return responsebody with status of request
	 */
	public abstract ResponseBody<User> inviteUser(SignUpForm u);
	/** for assignor+, delete user of lower tier (equal in admin case)
	 * @param u User to remove
	 * @return responsebody status of request
	 */
	public abstract ResponseBody<User> removeUser(User u);
	/** assignor+, change a user's access level or information
	 * @param u
	 * @return
	 */
	public abstract ResponseBody<User> manageUser(User u);
	/** assignor+, forcibly create a game and add it to the schedule with no checks on it.
	 *  userlevels, create a game request
	 * @param g game to create
	 * @return responsebody status of creation
	 */
	public abstract ResponseBody<Game> createGame(Game g);
	/** assignor+, verify a game for the "fixed" schedule
	 *  userlevels, accept a game offer
	 * @param g game to verify
	 * @return responsebody status of request
	 */
	public abstract ResponseBody<Long> approveGame(Long g);
	/** assignor+, reject a game to be added to 'fixed" schedule
	 * userlevel, deny game offer
	 * @param g game to reject
	 * @return responsebody status of request
	 */
	public abstract ResponseBody<Game> rejectGame(Game g);
	/** assignor+, reschedule a game on request
	 * userlevel, request to reschedule a game
	 * @param g game to reschedule
	 * @return responsebody status of rescheduling
	 */
	public abstract ResponseBody<Game> rescheduleGame(Game g);
	/** assignor+, remove a game from the system
	 * @param id game to remove
	 * @return responsebody with game and status
	 */
	public abstract ResponseBody<Long> deleteGame(DataObject<Long> id);
	/** admin, add a district to the service
	 * @param d district to add
	 * @return responsebody with status
	 */
	public abstract ResponseBody<District> addDistrict(District d);
	/**admin, remove a district from the service
	 * @param d district to remove
	 * @return responsebody with status
	 */
	public abstract ResponseBody<District> removeDistrict(District d);
	/** assignor+, add a school to the service
	 * @param s school to add to service
	 * @return
	 */
	public abstract ResponseBody<School> addSchool(School s);
	/** assignor+, remove school from service
	 * @param s school to remove
	 * @return responsebody with status
	 */
	public abstract ResponseBody<School> removeSchool(School s);
	public abstract ResponseBody<Teams> addTeam(Teams t);
	public abstract ResponseBody<Teams> removeTeam(Teams t);
	/** assignor+, add a day as an event and prevent games from being scheduled there
	 * @param d eventday to add
	 * @return responsebody with status of request
	 */
	public abstract ResponseBody<EventDay> addEventDay(EventDay d);
	/** assignor+, remove an event day that was previously created
	 * @param d eventday to remove
	 * @return responsebody status
	 */
	public abstract ResponseBody<EventDay> removeEventDay(EventDay d);
	//public void downloadSchedule(); //TODO is this a backend task?

//	public ResponseBody<Game> manageSchedule(Game g); //TODO this is an action not a method
//	public ResponseBody<Iterable<Game>> viewSchedule(); //TODO is this better in public hooks?
	/** all, Update a user's profile info
	 * @param u User to modify
	 * @return responsebody with status
	 */
	public abstract ResponseBody<User> updateProfile(User u);
	/** all, change users password. MUST BE SIGNED IN
	 * @param u user to update
	 * @return responsebody with user that is updated
	 */
	public abstract ResponseBody<User> updatePassword(User u, User u2);
	
	/**
	 * @param d day you want to add
	 * @return responsebody with status of request
	 */
	public abstract ResponseBody<BadDay> addBadDay(BadDay d);

	/**
	 * @param d badday to remove
	 * @return responsebody with status
	 */
	public abstract ResponseBody<BadDay> removeBadDay(BadDay d);

	/**
	 * @param d idealday to save
	 * @return responsebody with status
	 */
	public abstract ResponseBody<IdealDay> saveIdealDay(IdealDay d);

	/**
	 * @param d idealday to remove
	 * @return responsebody with status
	 */
	public abstract ResponseBody<IdealDay> removeIdealDay(IdealDay d);
}
