package com.setgreen.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Teams;
import com.setgreen.setgreen.repositories.TeamsRepo;
import com.setgreen.setgreen.services.TeamsService;

@Service
public class TeamsServiceImpl implements TeamsService{

	@Autowired
	TeamsRepo tr;
	
	@Override
	public ResponseBody saveTeam(Teams tm) {
		try {
			System.out.println(tm);
			tr.save(tm);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Team saved!", tm);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.CONFLICT.value(), "Could not create team!", tm);
		}
	}

	@Override
	public Iterable<Teams> getTeams() {
		return tr.findAll();
	}
	
}
