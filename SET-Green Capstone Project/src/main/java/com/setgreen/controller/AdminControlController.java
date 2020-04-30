package com.setgreen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.User;
import com.setgreen.model.scheduling.EventDay;
import com.setgreen.services.AdminControlService;

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
    @PostMapping("/user/remove")
    public ResponseBody<User> removeUser(@RequestBody User u, Authentication auth){
    	return hlp.getRoleByBest(auth).removeUser(u);
    }
    
    /*
     * updates verification status of user
     * BODY:
     * 	{"id":long, "verified":bool}
     */
    @PostMapping("/user/update/verify")
    public ResponseBody<User> updateUserVerify(@RequestBody User u, Authentication auth){
    	return hlp.getRoleByBest(auth).verifyUser(u);
    }
    @PostMapping("day/ban")
    public ResponseBody<EventDay> banDay(@RequestBody EventDay d, Authentication auth) {
    	return hlp.getRoleByBest(auth).addEventDay(d);
    }
    @PostMapping("day/allow")
    public ResponseBody<EventDay> unbanDay(@RequestBody EventDay d, Authentication auth) {
    	return hlp.getRoleByBest(auth).removeEventDay(d);
    }
    @PostMapping("game/verify")
    public ResponseBody<Long> verifyGame(@RequestBody Game g, Authentication auth) {
    	return hlp.getRoleByBest(auth).approveGame(auth, g.getId());
    }
}
