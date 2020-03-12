package com.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.setgreen.model.District;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.School;
import com.setgreen.model.Teams;
import com.setgreen.repositories.DistrictRepo;
import com.setgreen.repositories.SchoolRepo;
import com.setgreen.repositories.TeamsRepo;
import com.setgreen.services.TeamsService;

@Service
public class TeamsServiceImpl implements TeamsService{

	@Autowired
	TeamsRepo tr;
	@Autowired
	SchoolRepo sr;
	@Override
	public ResponseBody<Teams> saveTeam(Teams tm) {
		try {
			//tm.setSchool(sr.findById(tm.getSchool().getId()).get());
			System.out.println(tm);
			tr.save(tm);
			return new ResponseBody<Teams>(HttpStatus.ACCEPTED.value(), "Team saved!", tm);
		}
		catch(Exception e) {
			return new ResponseBody<Teams>(HttpStatus.CONFLICT.value(), "Could not create team "+e, tm);
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

	@Override
	public ResponseBody<Iterable<Teams>> getTeamsByDistrict(District d) {
		return new ResponseBody<Iterable<Teams>>(HttpStatus.ACCEPTED.value(), "Teams found", tr.findBySchool_District_Id(d.getId()));
	}
	
}
