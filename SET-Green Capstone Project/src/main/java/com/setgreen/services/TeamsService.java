package com.setgreen.services;

import com.setgreen.model.District;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.Teams;

public interface TeamsService {
	ResponseBody<Teams> saveTeam(Teams tm);

	ResponseBody<Iterable<Teams>> getTeams();

	ResponseBody<Teams> getTeamsByName(String tm);

	ResponseBody<Iterable<Teams>> getTeamsByDistrict(District d);

	ResponseBody<Teams> getTeamsById(Teams t);
}
