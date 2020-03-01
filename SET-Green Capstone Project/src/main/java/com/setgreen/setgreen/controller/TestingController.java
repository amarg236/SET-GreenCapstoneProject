package com.setgreen.setgreen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.services.UserService;
import com.setgreen.setgreen.services.ViewUserService;
import com.setgreen.setgreen.util.Debugger;

@RestController
@CrossOrigin
@RequestMapping("/api/test/")
public class TestingController {

    @Autowired
    private ViewUserService viewUserService;
    @Autowired
    private UserService us;
    @GetMapping("showUser")
    public List<User> showusers(){
        return viewUserService.ViewUsers();
    }
    
    @PostMapping("makeUser")
    public ResponseBody<User> mu(@RequestBody SignUpForm u){
    	if(Debugger.MODE_ON) {
    		return us.saveUser(u);
    	}
    	return null;
    }

}
