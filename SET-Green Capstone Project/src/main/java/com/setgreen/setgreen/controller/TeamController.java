package com.setgreen.setgreen.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Teams;
import com.setgreen.setgreen.model.scheduling.BadDay;
import com.setgreen.setgreen.model.scheduling.IdealDay;
import com.setgreen.setgreen.services.TeamsService;
import com.setgreen.setgreen.services.implementation.DayHandlerImpl;
import com.setgreen.setgreen.services.implementation.TeamsServiceImpl;

@CrossOrigin
@RestController
@RequestMapping("team")
public class TeamController {
	
	
	private TeamsService tmRpo = new TeamsServiceImpl();
	private DayHandlerImpl dh = new DayHandlerImpl();
	
	@PostMapping("add")
	public ResponseBody addTeam(@RequestBody Teams t) {
		System.out.println(t);
		//tmRpo.saveTeam(t);
		return new ResponseBody(HttpStatus.CREATED.value(), "Team added!", t);
	}
	
	//TODO getTeams
	@GetMapping("get")
	public Iterable<Teams> getTeams(@RequestBody Teams t) {
		return tmRpo.getTeams();
	}
	
	@PostMapping("day/bad/save")
	public ResponseBody forbidDay(@RequestBody BadDay d) {
		return dh.saveBadDay(d);
	}
	@PostMapping("day/bad/remove")
	public ResponseBody removeBadDay(@RequestBody BadDay d) {
		return dh.deleteBadDay(d);
	}
	@PostMapping("day/good/add")
	public ResponseBody wantGameHere(@RequestBody IdealDay d) {
		return dh.saveIdealDay(d);
	}
	@PostMapping("day/good/remove")
	public ResponseBody removeIdealDay(@RequestBody IdealDay d) {
		return dh.deleteIdealDay(d);
	}
}
