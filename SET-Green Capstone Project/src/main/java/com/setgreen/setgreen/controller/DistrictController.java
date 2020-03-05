package com.setgreen.setgreen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.services.admin.DistrictHandler;

@RequestMapping("api/location/district")
public class DistrictController {
	@Autowired
	ControllerAssistant hlp;
	@Autowired
	DistrictHandler dh;
	
    @PostMapping("add")
    public ResponseBody<District> addDistrict(@RequestBody District d, Authentication auth){ //@RequestHeader("Authorization") String a){
    	return hlp.getRole(auth).addDistrict(d);
    }
    
    @PostMapping("remove")
    public ResponseBody<District> removeDistrict(@RequestBody District d, Authentication auth){
    	return hlp.getRole(auth).removeDistrict(d);
    }
    
    @PostMapping("get")
    public ResponseBody<Iterable<District>> getDistricts(){
    	return dh.getAll();
    }
}
