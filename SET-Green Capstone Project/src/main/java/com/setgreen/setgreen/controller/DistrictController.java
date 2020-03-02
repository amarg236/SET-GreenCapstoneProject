package com.setgreen.setgreen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.ResponseBody;

@RequestMapping("api/location/district")
public class DistrictController {
	@Autowired
	ControllerAssistant hlp;
	
    @PostMapping("district/add")
    public ResponseBody<District> addDistrict(@RequestBody District d, Authentication auth){ //@RequestHeader("Authorization") String a){
    	return hlp.getRole(auth).addDistrict(d);
    }
    
    @PostMapping("district/remove")
    public ResponseBody<District> removeDistrict(@RequestBody District d, Authentication auth){
    	return hlp.getRole(auth).removeDistrict(d);
    }
}
