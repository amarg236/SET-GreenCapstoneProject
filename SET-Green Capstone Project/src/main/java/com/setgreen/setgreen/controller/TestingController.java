package com.setgreen.setgreen.controller;

import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.services.ViewUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/user/")
public class TestingController {

    @Autowired
    private ViewUserService viewUserService;

    @GetMapping("showUser")
    public List<User> showusers(){
        return viewUserService.ViewUsers();
    }

}
