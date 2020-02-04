package com.setgreen.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;

import com.setgreen.setgreen.model.Teams;
import com.setgreen.setgreen.repositories.TeamsRepo;
import com.setgreen.setgreen.services.TeamsService;

public class TeamsServiceImpl implements TeamsService{

	@Autowired
	TeamsRepo tr;
	
	@Override
	public void saveTeam(Teams tm) {
		tr.save(tm);
	}
	
}
