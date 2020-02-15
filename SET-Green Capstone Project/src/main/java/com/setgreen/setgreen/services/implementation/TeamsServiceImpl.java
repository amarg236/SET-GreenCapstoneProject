package com.setgreen.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Teams;
import com.setgreen.setgreen.repositories.TeamsRepo;
import com.setgreen.setgreen.services.TeamsService;

public class TeamsServiceImpl implements TeamsService{

	@Autowired
	TeamsRepo tr;
	
	@Override
	public ResponseBody saveTeam(Teams tm) {
		tr.save(tm);
		return new ResponseBody(HttpStatus.ACCEPTED.value(), "Team saved!", tm);
	}

	@Override
	public Iterable<Teams> getTeams() {
		return tr.findAll();
	}
	
}
