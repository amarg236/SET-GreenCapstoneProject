package com.setgreen.setgreencapstoneproject.service;

import com.setgreen.setgreencapstoneproject.model.Login;
import com.setgreen.setgreencapstoneproject.model.ResponseBody;
import com.setgreen.setgreencapstoneproject.model.SignUpForm;
import com.setgreen.setgreencapstoneproject.model.User;

import java.util.List;

public interface UserService {
    ResponseBody Register(SignUpForm user);
    ResponseBody Login(Login login);
    List<User> ViewUsers();

}
