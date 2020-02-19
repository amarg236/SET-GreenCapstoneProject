package com.setgreen.setgreen.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@CrossOrigin
@RequestMapping("api/game")
public class GameController {
	@Autowired
	GameHandler gh = new GameHandler();
	
	@PostMapping("save")
	public ResponseBody save(@RequestBody Game g){
		return gh.saveGame(g); //TODO Add verify for other coach
	}
	
	@PostMapping("delete")
	public ResponseBody delete(@RequestBody Long id) {
		return gh.deleteGame(id);
	}
	
	@PostMapping("modify")
	public ResponseBody modify(@RequestBody Game g) {
		return gh.modifyGame(g);
	}
	
	/** Gets all the verified games in a district
	 * @param district String name of district for games
	 * @return ResponseBody status of request
	 */
	@PostMapping("get/district")
	public ResponseBody getDistrict(@RequestBody District d) {
		return gh.getGames(d, false);
	}
	
	@PostMapping("get/district/all")
	public ResponseBody getDistrictAll(@RequestBody District d) {
		return gh.getGames(d, true);
	}
	
	@PostMapping("get/BySchool")
	public ResponseBody getSchool(@RequestBody School s) {
		return gh.getGames(s, false);
	}
	
	@PostMapping("get/BySchool/all")
	public ResponseBody getSchoolAll(@RequestBody School s) {
		return gh.getGames(s, true);
	}
	
	@PostMapping("get/all")
	public ResponseBody getAll() {
		return gh.allGames();
	}
}
