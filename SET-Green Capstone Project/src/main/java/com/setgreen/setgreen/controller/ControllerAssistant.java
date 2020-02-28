package com.setgreen.setgreen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.setgreen.setgreen.model.RoleName;
import com.setgreen.setgreen.services.usergroups.RoleManager;
import com.setgreen.setgreen.services.usergroups.UserReference;
@Component
public class ControllerAssistant {
	@Autowired
	RoleManager rn;
	protected UserReference getRole(Authentication auth){
		return rn.build(RoleName.valueOf(auth.getAuthorities().toArray()[0].toString()));
		
	}
}
