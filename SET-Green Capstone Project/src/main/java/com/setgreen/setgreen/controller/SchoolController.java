package com.setgreen.setgreen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.services.implementation.SchoolHandler;

@RestController
@CrossOrigin
@RequestMapping("api/location/school/")
public class SchoolController {
	
	@Autowired
	SchoolHandler sh = new SchoolHandler();
	
	@PostMapping("add")
	public ResponseBody addSchool(@RequestBody School s) {
		return sh.addSchool(s);
	}
	
	@PostMapping("remove")
	public ResponseBody deleteSchool(@RequestBody School s) {
		return sh.deleteSchool(s);
	}
}
