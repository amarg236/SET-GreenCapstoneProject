package com.setgreen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.model.District;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.Teams;
import com.setgreen.model.scheduling.BadDay;
import com.setgreen.model.scheduling.IdealDay;
import com.setgreen.services.DayHandler;
import com.setgreen.services.TeamsService;
import com.setgreen.services.implementation.DayHandlerImpl;
import com.setgreen.services.implementation.TeamsServiceImpl;

/**
 * @author Brendon LeBaron
 * Stuff for managing teams
 *
 */
@CrossOrigin
@RestController
@RequestMapping("api/team/")
public class TeamController {
	@Autowired
	private ControllerAssistant hlp;
	@Autowired
	private TeamsService tmRpo = new TeamsServiceImpl();
	@Autowired
	private DayHandler dh = new DayHandlerImpl();
	
	/**
	 * @param t Team to add
	 * @return Response Body with status and team sent
	 */
	@PostMapping("add")
	public ResponseBody<Teams> addTeam(@RequestBody Teams t, Authentication auth) {
		return hlp.getRoleByLocation(auth, t.getSchool().getDistrict()).addTeam(t);
	}
	
	/**
	 * @return all teams in the database
	 */
	@PostMapping("get")
	public ResponseBody<Iterable<Teams>> getTeams() {
		return tmRpo.getTeams();
	}
	/**
	 * @Return all teams in a given district
	 */
	@PostMapping("get/byDistrict")
	public ResponseBody<Iterable<Teams>> getTeamsByDistrict(@RequestBody District d){
		return tmRpo.getTeamsByDistrict(d);
	}
	/** takes a bad day and saves it
	 * @param d Day to set as a bad day for a given team
	 * @return ResponseBody with status of request and day sent
	 *
	 */
	@PostMapping("day/bad/save") //TODO Decide if this method should allow IDs to be sent to override dates //TODO Team validation
	public ResponseBody<BadDay> saveBadDay(@RequestBody BadDay d, Authentication auth) {
		return hlp.getRoleByTeam(auth, d.getTm()).addBadDay(d);
	}
	/** takes a bad day and deletes it by id 
	 * @param d day to delete
	 * @return responsebody with the removed bad day
	 */
	@PostMapping("day/bad/remove")
	public ResponseBody<BadDay> removeBadDay(@RequestBody BadDay d, Authentication auth) {
		return hlp.getRoleByTeam(auth, d.getTm()).removeBadDay(d);
	}
	
	/**
	 * @return responsebody with all bad days
	 */
	@PostMapping("day/bad/get/all")
	public ResponseBody<Iterable<BadDay>> getBadDays(){
		return dh.findBadDays();
	}
	/**
	 * @param t Team to get bad days for (must include ID)
	 * @return responsebody all bad days for the given team
	 */
	@PostMapping("day/bad/get/team") //TODO team validation
	public ResponseBody<Iterable<BadDay>> getBadDays(@RequestBody Teams t){
		return dh.findBadDays(t);
	}
	
	/**
	 * @param d idealday to save
	 * @return responsebody status of request and the day sent
	 */
	@PostMapping("day/good/save") //TODO team validation
	public ResponseBody<IdealDay> wantGameHere(@RequestBody IdealDay d, Authentication auth) {
		return hlp.getRoleByTeam(auth, d.getTm()).saveIdealDay(d);
	}
	/**
	 * @param d day to remove (must include ID)
	 * @return responsebody with status of request and removed day
	 */
	@PostMapping("day/good/remove") //TODO team validation
	public ResponseBody<IdealDay> removeIdealDay(@RequestBody IdealDay d, Authentication auth) {
		return hlp.getRoleByTeam(auth, d.getTm()).removeIdealDay(d);
	}
	/**
	 * @return responsebody with an iterable of all good days in database
	 */
	@PostMapping("day/good/get/all")
	public ResponseBody<Iterable<IdealDay>> getGoodDays(){
		return dh.findIdealDays();
	}
	/**
	 * @param t Teams that you want to get good days for. You ONLY need the id.
	 * @return responsebody with the teams good days
	 */
	@PostMapping("day/good/get/team")
	public ResponseBody<Iterable<IdealDay>> getGoodDays(@RequestBody Teams t){
		return dh.findIdealDays(t);
	}
}
