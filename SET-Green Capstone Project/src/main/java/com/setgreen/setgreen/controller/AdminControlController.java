package com.setgreen.setgreen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.services.AdminControlService;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/")
public class AdminControlController{

	@Autowired
	private ControllerAssistant hlp;
    @Autowired
    private AdminControlService adminControlService;

    @GetMapping("viewUnverifiedUser")
    public List<User> viewUnverified(){

        return adminControlService.viewUnverifiedUser();
    }
/*//TODO IMPLEMENT this is something we can do with a password change for now though.
    @PostMapping("verifyUser")
    public ResponseBody<User> verifyUser(@RequestBody User user)
    {
        if(adminControlService.setVerified(user.getEmail()))
        {
            return new ResponseBody<User>(HttpStatus.CREATED.value(),"Successfully verified user", user );
        }
        return new ResponseBody<User>(HttpStatus.BAD_REQUEST.value(),"User not verified", user );

    }
*/    
    @PostMapping("district/add")
    public ResponseBody<District> addDistrict(@RequestBody District d, Authentication auth){ //@RequestHeader("Authorization") String a){
    	return hlp.getRole(auth).addDistrict(d);
    }
    
    @PostMapping("district/remove")
    public ResponseBody<District> removeDistrict(@RequestBody District d, Authentication auth){
    	return hlp.getRole(auth).removeDistrict(d);
    }
    
    @PostMapping("day/ban") //XXX TEST
    public ResponseBody<EventDay> banDay(@RequestBody EventDay d, Authentication auth) {
    	return hlp.getRole(auth).addEventDay(d);
    }
    @PostMapping("day/allow") //XXX TEST
    public ResponseBody<EventDay> unbanDay(@RequestBody EventDay d, Authentication auth) {
    	return hlp.getRole(auth).removeEventDay(d);
    }
    @PostMapping("game/verify")
    public ResponseBody<Long> verifyGame(@RequestBody Game g, Authentication auth) {
    	return hlp.getRole(auth).approveGame(g.getId());
    }
}
