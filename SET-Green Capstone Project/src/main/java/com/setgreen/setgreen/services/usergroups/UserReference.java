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
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.services.DayHandler;
import com.setgreen.setgreen.services.UserService;
import com.setgreen.setgreen.services.admin.DistrictHandler;
import com.setgreen.setgreen.services.implementation.DayHandlerImpl;
import com.setgreen.setgreen.services.implementation.GameHandler;
import com.setgreen.setgreen.services.implementation.RoleServiceImpl;
import com.setgreen.setgreen.services.implementation.SchoolHandler;
import com.setgreen.setgreen.services.implementation.UserServiceImpl;
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
	
	/** for assignor+, invite user of lower tier (equal in admin case)
	 * @param u User to create
	 * @return responsebody with status of request
	 */
	public abstract ResponseBody<User> inviteUser(SignUpForm u, String a);
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
	public abstract ResponseBody<User> updatePassword(User u, String h);
	
	public <T> ResponseBody<T> forbiddenAccess(T obj){
		return new ResponseBody<T>(HttpStatus.FORBIDDEN.value(), "disallowed", obj);
	}
	
	public <T> ResponseBody<T> stubbed(T obj){
		return new ResponseBody<T>(HttpStatus.NOT_IMPLEMENTED.value(), "Unfinished", obj);
	}
	/**
	 * @return rolename associated with this class
	 */
	public abstract RoleName getName();
}
