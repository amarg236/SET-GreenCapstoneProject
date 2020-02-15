package com.setgreen.setgreen.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.services.implementation.GameHandler;

@RestController
@RequestMapping("game")
public class GameController {
	
	GameHandler gh = new GameHandler();
	
	@PostMapping("save")
	public ResponseBody save(@RequestBody Game g){
		return gh.saveGame(g);
	}
	
	@PostMapping("delete")
	public ResponseBody delete(@RequestBody Game g) {
		return gh.deleteGame(g);
	}
	
	@PostMapping("modify")
	public ResponseBody modify(@RequestBody Game g) {
		return gh.modifyGame(g);
	}
}
