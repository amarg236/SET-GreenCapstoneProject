package com.setgreen.setgreen.controller;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.services.admin.DistrictHandler;
import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.RoleName;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.services.AdminControlService;
import com.setgreen.setgreen.services.implementation.DayHandlerImpl;
import com.setgreen.setgreen.services.implementation.GameHandler;
import com.setgreen.setgreen.services.usergroups.UserReference;
import com.setgreen.setgreen.util.DataObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/admin/")
public class AdminControlController {

    @Autowired
    private AdminControlService adminControlService;

    @GetMapping("viewUnverifiedUser")
    public List<User> viewUnverified(){

        return adminControlService.viewUnverifiedUser();
    }

    @PostMapping("verifyUser")
    public ResponseBody<User> verifyUser(@RequestBody User user)
    {
        if(adminControlService.setVerified(user.getEmail()))
        {
            return new ResponseBody<User>(HttpStatus.CREATED.value(),"Successfully verified user", user );
        }
        return new ResponseBody<User>(HttpStatus.BAD_REQUEST.value(),"User not verified", user );

    }
    
    @PostMapping("district/add")
    public ResponseBody<District> addDistrict(@RequestBody District d, @RequestHeader("Authorization") String a){
    	return UserReference.getRoleFromToken(a, d).build().addDistrict(d);
    }
    
    @PostMapping("district/remove")
    public ResponseBody<District> removeDistrict(@RequestBody District d, @RequestHeader("Authorization") String a){
    	RoleName r = UserReference.getRoleFromToken(a, d);
    	return r.build().removeDistrict(d);
    }
    
    @PostMapping("day/ban") //XXX TEST
    public ResponseBody<EventDay> banDay(@RequestBody EventDay d, @RequestHeader("Authorization") String a) {
    	return UserReference.getRoleFromToken(a, null).build().addEventDay(d);
    }
    @PostMapping("day/allow") //XXX TEST
    public ResponseBody<EventDay> unbanDay(@RequestBody EventDay d, @RequestHeader("Authorization") String a) {
    	return UserReference.getRoleFromToken(a, null).build().removeEventDay(d);
    }
    @PostMapping("game/verify")
    public ResponseBody<Long> verifyGame(@RequestBody Game g, @RequestHeader("Authorization") String a) {
    	return UserReference.getRoleFromToken(a, g.getHomedistrict()).build().approveGame(g.getId());
    }
}
