package com.setgreen.setgreen.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user/")
public class TestingController {

    @GetMapping("showUser")
    public String showusers(){
        return "This is nothing but just test of other controller";
    }

}
