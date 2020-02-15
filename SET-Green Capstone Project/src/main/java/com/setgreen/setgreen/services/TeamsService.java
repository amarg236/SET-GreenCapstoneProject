package com.setgreen.setgreen.services;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Teams;

public interface TeamsService {
	ResponseBody saveTeam(Teams tm);

	Iterable<Teams> getTeams();
}
