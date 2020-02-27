package com.setgreen.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

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
import com.setgreen.setgreen.services.implementation.SchoolHandler;
import com.setgreen.setgreen.services.implementation.UserServiceImpl;
import com.setgreen.setgreen.util.DataObject;

public interface UserReference {
	@Autowired
	GameHandler gh = new GameHandler();
	
	@Autowired
	UserService ur = new UserServiceImpl();
	
	@Autowired
	DistrictHandler dh = new DistrictHandler();
	
	@Autowired
	DayHandler dyh = new DayHandlerImpl();
	
	@Autowired
	SchoolHandler sh = new SchoolHandler();
	/** for assignor+, invite user of lower tier (equal in admin case)
	 * @param u User to create
	 * @return responsebody with status of request
	 */
	public ResponseBody<User> inviteUser(SignUpForm u, String a);
	/** for assignor+, delete user of lower tier (equal in admin case)
	 * @param u User to remove
	 * @return responsebody status of request
	 */
	public ResponseBody<User> removeUser(User u);
	/** assignor+, change a user's access level or information
	 * @param u
	 * @return
	 */
	public ResponseBody<User> manageUser(User u);
	/** assignor+, forcibly create a game and add it to the schedule with no checks on it.
	 *  userlevels, create a game request
	 * @param g game to create
	 * @return responsebody status of creation
	 */
	public ResponseBody<Game> createGame(Game g);
	/** assignor+, verify a game for the "fixed" schedule
	 *  userlevels, accept a game offer
	 * @param g game to verify
	 * @return responsebody status of request
	 */
	public ResponseBody<Long> approveGame(Long g);
	/** assignor+, reject a game to be added to 'fixed" schedule
	 * userlevel, deny game offer
	 * @param g game to reject
	 * @return responsebody status of request
	 */
	public ResponseBody<Game> rejectGame(Game g);
	/** assignor+, reschedule a game on request
	 * userlevel, request to reschedule a game
	 * @param g game to reschedule
	 * @return responsebody status of rescheduling
	 */
	public ResponseBody<Game> rescheduleGame(Game g);
	/** assignor+, remove a game from the system
	 * @param id game to remove
	 * @return responsebody with game and status
	 */
	public ResponseBody<Long> deleteGame(DataObject<Long> id);
	/** admin, add a district to the service
	 * @param d district to add
	 * @return responsebody with status
	 */
	public ResponseBody<District> addDistrict(District d);
	/**admin, remove a district from the service
	 * @param d district to remove
	 * @return responsebody with status
	 */
	public ResponseBody<District> removeDistrict(District d);
	/** assignor+, add a school to the service
	 * @param s school to add to service
	 * @return
	 */
	public ResponseBody<School> addSchool(School s);
	/** assignor+, remove school from service
	 * @param s school to remove
	 * @return responsebody with status
	 */
	public ResponseBody<School> removeSchool(School s);
	/** assignor+, add a day as an event and prevent games from being scheduled there
	 * @param d eventday to add
	 * @return responsebody with status of request
	 */
	public ResponseBody<EventDay> addEventDay(EventDay d);
	/** assignor+, remove an event day that was previously created
	 * @param d eventday to remove
	 * @return responsebody status
	 */
	public ResponseBody<EventDay> removeEventDay(EventDay d);
	//public void downloadSchedule(); //TODO is this a backend task?

//	public ResponseBody<Game> manageSchedule(Game g); //TODO this is an action not a method
//	public ResponseBody<Iterable<Game>> viewSchedule(); //TODO is this better in public hooks?
	/** all, Update a user's profile info
	 * @param u User to modify
	 * @return responsebody with status
	 */
	public ResponseBody<User> updateProfile(User u);
	/** all, change users password. MUST BE SIGNED IN
	 * @param u user to update
	 * @return responsebody with user that is updated
	 */
	public ResponseBody<User> updatePassword(User u, String h);
	public static RoleName getRoleFromToken(String t, District d) {
		return ur.getByToken(t).getRoles(d);
	}
	public static <T> ResponseBody<T> forbiddenAccess(T obj){
		return new ResponseBody<T>(HttpStatus.FORBIDDEN.value(), "disallowed", obj);
	}
	
	public static <T> ResponseBody<T> stubbed(T obj){
		return new ResponseBody<T>(HttpStatus.NOT_IMPLEMENTED.value(), "Unfinished", obj);
	}
}
