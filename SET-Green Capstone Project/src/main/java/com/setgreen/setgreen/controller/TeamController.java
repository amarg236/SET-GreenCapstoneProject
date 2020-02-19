package com.setgreen.setgreen.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Teams;
import com.setgreen.setgreen.services.TeamsService;
import com.setgreen.setgreen.services.implementation.TeamsServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("team")
public class TeamController {
	
	private TeamsService tmRpo = new TeamsServiceImpl();
	
	@PostMapping("add")
	public ResponseBody addTeam(Teams t) {
		tmRpo.saveTeam(t);
		return new ResponseBody(HttpStatus.CREATED.value(), "Team added!", t);
	}
	
	@GetMapping("get")
	public void getTeams(Teams t) {
		
	}
}
