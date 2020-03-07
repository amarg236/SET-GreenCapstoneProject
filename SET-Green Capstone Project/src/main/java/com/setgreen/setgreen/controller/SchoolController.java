package com.setgreen.setgreen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.services.implementation.SchoolHandler;

@RestController
@CrossOrigin
@RequestMapping("api/location/school/")
public class SchoolController {
	
	@Autowired
	SchoolHandler sh = new SchoolHandler();
	@Autowired
	ControllerAssistant hlp;
	/**
	 * @param s School to add
	 * @return ResponseBody with school added and status of request
	 */
	@PostMapping("add")
	public ResponseBody<School> addSchool(@RequestBody School s, Authentication auth) {
		return hlp.getRoleByBest(auth).addSchool(s);
	}
	
	/**
	 * @param s School to remove
	 * @return ResponseBody with school removed and status of request
	 */
	@PostMapping("remove")
	public ResponseBody<School> deleteSchool(@RequestBody School s, Authentication auth) {
		return hlp.getRoleByBest(auth).removeSchool(s);
	}
	
	/**
	 * @param d district to search
	 * @return all schools in the given district
	 */
	@PostMapping("get/district")
	public ResponseBody<Iterable<School>> findInDistrict(@RequestBody District d){
		return sh.getAllSchoolsInDistrict(d);
	}
	
	/**
	 * @return all schools in the system
	 */
	@PostMapping("get/all")
	public ResponseBody<Iterable<School>> findAll(){
		return sh.getAllSchools();
	}
}
