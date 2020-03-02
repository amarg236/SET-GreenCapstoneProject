package com.setgreen.setgreen.services;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Teams;

public interface TeamsService {
	ResponseBody<Teams> saveTeam(Teams tm);

	ResponseBody<Iterable<Teams>> getTeams();
}
