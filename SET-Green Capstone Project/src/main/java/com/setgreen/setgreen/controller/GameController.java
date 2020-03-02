package com.setgreen.setgreen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.services.implementation.GameHandler;
import com.setgreen.setgreen.util.DataObject;

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
		return hlp.getRole(auth).createGame(g);
	}
	
	@PostMapping("delete")
	public ResponseBody<Long> delete(@RequestBody DataObject<Long> id, Authentication auth) {
		return hlp.getRole(auth).deleteGame(id);
	}
	@PostMapping("modify")
	public ResponseBody<Game> modify(@RequestBody Game g, Authentication auth) {
		return hlp.getRole(auth).rescheduleGame(g);
	}
	
	@PostMapping("accept")
	public ResponseBody<Long> accept(@RequestBody Game g, Authentication auth) {
		return hlp.getRole(auth).approveGame(g.getId());
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
		return gh.getGames(s, true);
	}
	
	@PostMapping("get/all")
	public ResponseBody<Iterable<Game>> getAll() {
		return gh.allGames();
	}
}
