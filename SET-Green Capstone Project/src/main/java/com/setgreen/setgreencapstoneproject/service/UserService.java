package com.setgreen.setgreencapstoneproject.service;

import com.setgreen.setgreencapstoneproject.model.Login;
import com.setgreen.setgreencapstoneproject.model.ResponseBody;
import com.setgreen.setgreencapstoneproject.model.userbase.User;

import java.util.List;

import javax.validation.Valid;

public interface UserService {
    ResponseBody Register(@Valid User usr);
    ResponseBody Login(Login login);
    List<User> ViewUsers();

}
