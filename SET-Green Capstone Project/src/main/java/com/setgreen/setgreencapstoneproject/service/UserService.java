package com.setgreen.setgreencapstoneproject.service;

import com.setgreen.setgreencapstoneproject.model.Login;
import com.setgreen.setgreencapstoneproject.model.ResponseBody;
import com.setgreen.setgreencapstoneproject.model.SignUpForm;

public interface UserService {
    ResponseBody Register(SignUpForm user);
    ResponseBody Login(Login login);
}
