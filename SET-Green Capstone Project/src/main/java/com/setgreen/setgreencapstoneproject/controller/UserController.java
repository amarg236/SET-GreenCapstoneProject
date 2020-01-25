package com.setgreen.setgreencapstoneproject.controller;


import com.setgreen.setgreencapstoneproject.model.Login;
import com.setgreen.setgreencapstoneproject.model.ResponseBody;
import com.setgreen.setgreencapstoneproject.model.userbase.User;
import com.setgreen.setgreencapstoneproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("signUp")
    public ResponseBody Register(@Valid @RequestBody User usr){

        return userService.Register(usr);

    }

    @PostMapping("signIn")
    public ResponseBody SignIn(@Valid @RequestBody Login login)
    {
        return userService.Login(login);
    }

    @GetMapping("viewusers")
    public List<User> ViewUsers()
    {
        return userService.ViewUsers();
    }

}
