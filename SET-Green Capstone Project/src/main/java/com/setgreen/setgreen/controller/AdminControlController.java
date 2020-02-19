package com.setgreen.setgreen.controller;

import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.services.AdminControlService;
import com.setgreen.setgreen.services.implementation.DayHandlerImpl;
import com.setgreen.setgreen.services.implementation.GameHandler;

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

    private DayHandlerImpl dh = new DayHandlerImpl();

    private GameHandler gh = new GameHandler();


    @GetMapping("viewUnverifiedUser")
    public List<User> viewUnverified(){

        return adminControlService.viewUnverifiedUser();
    }

    @PostMapping("verifyUser")
    public ResponseBody verifyUser(@RequestBody User user)
    {
        if(adminControlService.setVerified(user.getEmail()))
        {
            return new ResponseBody(HttpStatus.CREATED.value(),"Successfully verified user", new User() );
        }
        return new ResponseBody(HttpStatus.BAD_REQUEST.value(),"User not verified", new User() );

    }
    
    @PostMapping("day/ban") //XXX TEST
    public ResponseBody banDay(@RequestBody EventDay d) {
    	return dh.saveEventDay(d);
    }
    @PostMapping("day/allow") //XXX TEST
    public ResponseBody unbanDay(@RequestBody EventDay d) {
    	return dh.deleteEventDay(d);
    }
    @PostMapping("game/verify") //XXX TEST
    public ResponseBody verifyGame(@RequestBody Long g) {
    	return gh.verifyGame(g);
    }
}
