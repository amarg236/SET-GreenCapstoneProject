package com.setgreen.setgreen.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("")
public class HomeController {
    @GetMapping("/")
    public String greetings(){
        return "This is just a test home controller. Look for other endpoints";
    }
    @PostMapping("secure")
    public String secureTest() {
    	return "test of jwt";
    }
}
