package com.setgreen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.model.District;
import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.services.implementation.GameHandler;
import com.setgreen.util.CalanderFormat;

@RestController
@CrossOrigin
@RequestMapping("api/public/")
public class PublicApi {
	@Autowired
	GameHandler gh = new GameHandler();
	
	/** Gets all the verified games in a district
	 * @param district String name of district for games
	 * @return ResponseBody status of request
	 */
	@PostMapping("get/game/district")
	public ResponseBody<String> getDistrict(@RequestBody District d) {
		return CalanderFormat.format(gh.getGames(d, false));
	}
	@PostMapping("get/game/json")
	public ResponseBody<List<Game>> getJson(){
		return gh.JsonGetAll();
	}
	@PostMapping("get/game/all")
	public ResponseBody<String> getAll(){
		return CalanderFormat.format(gh.allVerifiedGames());
	}
}

