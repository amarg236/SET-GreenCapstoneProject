package com.setgreen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.model.District;
import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.School;
import com.setgreen.services.implementation.GameHandler;
import com.setgreen.util.DataObject;

@RestController
@CrossOrigin
@RequestMapping("api/game")
public class GameController {
	@Autowired
	GameHandler gh = new GameHandler();
	
	@Autowired
	ControllerAssistant hlp;
	
	@PostMapping("save")
	public ResponseBody<Game> save(@RequestBody Game g, Authentication auth){
		return hlp.getRoleByTeam(auth, g.getHometeam()).createGame(g);
	}
	
	@PostMapping("delete")
	public ResponseBody<Long> delete(@RequestBody DataObject<Long> id, Authentication auth) {
		return hlp.getRoleByTeam(auth, gh.getGameById(id).getHometeam()).deleteGame(id);
	}
	@PostMapping("modify")
	public ResponseBody<Game> modify(@RequestBody Game g, Authentication auth) {
		return hlp.getRoleByLocation(auth, gh.getGameById(g.getId()).getHomedistrict()).rescheduleGame(g);
	}
	
	@PostMapping("accept")
	public ResponseBody<Long> accept(@RequestBody Game g, Authentication auth) {//NOTE this MUST use getGameById as we're actively changing the game's parameters.
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId()).getAwayteam()).approveGame(g.getId());
	}
	
	/** Gets all the verified games in a district
	 * @param district String name of district for games
	 * @return ResponseBody status of request
	 */
	@PostMapping("get/district")
	public ResponseBody<Iterable<Game>> getDistrict(@RequestBody District d) {
		return gh.getGames(d, false);
	}
	
	@PostMapping("get/district/all")
	public ResponseBody<Iterable<Game>> getDistrictAll(@RequestBody District d) {
		return gh.getGames(d, true);
	}
	
	@PostMapping("get/BySchool")
	public ResponseBody<Iterable<Game>> getSchool(@RequestBody School s) {
		return gh.getGames(s, false);
	}
	
	@PostMapping("get/BySchool/all")
	public ResponseBody<Iterable<Game>> getSchoolAll(@RequestBody School s) {
		System.out.println(s.getDistrict());
		return gh.getGames(s, true);
	}
	
	@PostMapping("get/all")
	public ResponseBody<Iterable<Game>> getAll() {
		return gh.allGames();
	}
}
