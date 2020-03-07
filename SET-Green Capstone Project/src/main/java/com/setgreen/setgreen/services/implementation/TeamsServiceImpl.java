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
	public ResponseBody<Teams> saveTeam(Teams tm) {
		try {
			System.out.println(tm);
			tr.save(tm);
			return new ResponseBody<Teams>(HttpStatus.ACCEPTED.value(), "Team saved!", tm);
		}
		catch(Exception e) {
			return new ResponseBody<Teams>(HttpStatus.CONFLICT.value(), "Could not create team!", tm);
		}
	}

	@Override
	public ResponseBody<Iterable<Teams>> getTeams() {
		return new ResponseBody<Iterable<Teams>>(HttpStatus.ACCEPTED.value(), "Teams found", tr.findAll());
	}

	@Override
	public ResponseBody<Teams> getTeamsByName(String tm) {
		return new ResponseBody<Teams>(HttpStatus.ACCEPTED.value(), "Teams found", tr.findByTmName(tm));
	}

	public ResponseBody<Teams> deleteTeam(Teams t) {
		try {
			tr.deleteById(t.getId());
			return new ResponseBody<Teams>(HttpStatus.ACCEPTED.value(), "Team deleted", t);
		}
		catch(Exception e) {
			return new ResponseBody<Teams>(HttpStatus.BAD_REQUEST.value(), "Team could not be deleted", t);
		}
	}
	
}
