package com.setgreen.setgreencapstoneproject.controller;


import com.setgreen.setgreencapstoneproject.model.ResponseBody;
import com.setgreen.setgreencapstoneproject.model.userbase.User;
import com.setgreen.setgreencapstoneproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
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
    //TODO Disallow sign in on non-verified accounts
    @PostMapping("signIn")
    public ResponseBody SignIn(@Valid @RequestBody User u)
    {
        return userService.Login(u);
    }

    @GetMapping("viewusers")
    public List<User> ViewUsers()
    {
        return userService.ViewUsers();
    }
    
    //TODO add a verify user method (backend is already done in UserImpl)

}
