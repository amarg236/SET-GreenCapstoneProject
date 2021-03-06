package com.setgreen.services.usergroups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.setgreen.model.District;
import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.RoleName;
import com.setgreen.model.School;
import com.setgreen.model.SignUpForm;
import com.setgreen.model.Teams;
import com.setgreen.model.User;
import com.setgreen.model.noticeboard.Notice;
import com.setgreen.model.scheduling.BadDay;
import com.setgreen.model.scheduling.EventDay;
import com.setgreen.model.scheduling.IdealDay;
import com.setgreen.services.AdminControlService;
import com.setgreen.services.DayHandler;
import com.setgreen.services.UserService;
import com.setgreen.services.implementation.DistrictHandler;
import com.setgreen.services.implementation.GameHandler;
import com.setgreen.services.implementation.NoticeboardHandler;
import com.setgreen.services.implementation.RoleServiceImpl;
import com.setgreen.services.implementation.SchoolHandler;
import com.setgreen.services.implementation.TeamsServiceImpl;
import com.setgreen.util.DataObject;
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
	public UserService uh;
	@Autowired
	public DistrictHandler dh;
	@Autowired
	public DayHandler dyh;
	@Autowired
	public SchoolHandler sh;
	@Autowired
	public RoleServiceImpl rh;
	@Autowired
	public TeamsServiceImpl th;
	@Autowired
	public AdminControlService ah;
	@Autowired
	public NoticeboardHandler nh;
	/**
	 * @return rolename associated with this class, should be unique among all implementations of this class.
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
	/** user+, change your first and last name
	 * @param u
	 * @return
	 */
	public abstract ResponseBody<User> manageUser(User u);
	/**TODO do I need this? Or just use password change
	 * assignor+, Verifies a user
	 * @param u User to verify
	 * @return responsebody with verification status
	 */
	public abstract ResponseBody<User> verifyUser(User u);
	/** assignor+, forcibly create a game and add it to the schedule with no checks on it.
	 *  userlevels, create a game request
	 * @param g game to create
	 * @return responsebody status of creation
	 */
	public abstract ResponseBody<Game> createGame(Authentication auth, Game g);
	/** assignor+, verify a game for the "fixed" schedule
	 *  userlevels, accept a game offer
	 * @param g game to verify
	 * @return responsebody status of request
	 */
	public abstract ResponseBody<Long> approveGame(Authentication auth, Long g);
	/** assignor+, reject a game to be added to 'fixed" schedule
	 * userlevel, deny game offer
	 * @param g game to reject
	 * @return responsebody status of request
	 */
	public abstract ResponseBody<Game> rejectGame(Authentication auth, Game g);
	/** assignor+, reschedule a game on request
	 * userlevel, request to reschedule a game
	 * @param g game to reschedule
	 * @return responsebody status of rescheduling
	 */
	public abstract ResponseBody<Game> rescheduleGame(Authentication auth, Game g);
	/** assignor+, remove a game from the system
	 * @param id game to remove
	 * @return responsebody with game and status
	 */
	public abstract ResponseBody<Long> deleteGame(DataObject<Long> id);
	/** userlevel, cancel an unaccepted game request, or request to have an admin cancel their game
	 * admin, add a district to the service
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
	/** all, Update a user's profile info
	 * @param u User to modify
	 * @return responsebody with status
	 */
	public abstract ResponseBody<User> updateProfile(User u);
	/** all, change users password. MUST BE SIGNED IN
	 * @param u user to update
	 * @return responsebody with user that is updated
	 */
	public abstract ResponseBody<User> updtePassword(User u, User u2);
	
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

	/**
	 * used for users when seeing a game has been rejected. Cleans up everything
	 * For admin, just delete the game.
	 * @param auth
	 * @param g
	 * @return game you validated rejection for
	 */
	public abstract ResponseBody<Game> validateRejection(Authentication auth, Game g);
	
	/**
	 * used for admin, adds a notice to the homepage
	 * @param auth 
	 * @param n
	 * @return statuse of request w/ notice you sent
	 */
	public abstract ResponseBody<Notice> addNotice(Authentication auth, Notice n);
	
	/**
	 * used for admin, removes notice from homepage
	 * @param auth 
	 * @param n only requires id
	 * @return status of request w/ the notice as it was before deletion
	 */
	public abstract ResponseBody<Notice> deleteNotice(Authentication auth, Notice n);

	/*
	 * validate a game modification on the part of the hometeam
	 */
	public abstract ResponseBody<Game> validateModify(Authentication auth, Game g);
}
