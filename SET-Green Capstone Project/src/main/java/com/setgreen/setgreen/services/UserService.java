package com.setgreen.setgreen.services;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.payload.LoginRequest;

public interface UserService {

	ResponseBody<User> updatePassAndVerify(User u, User u2);
	
	public ResponseBody<User> fetchByEmail(String s);
	
	public ResponseBody<User> loginAttempt(LoginRequest l);

	ResponseBody<User> updateProfile(User u);

	ResponseBody<User> saveUser(SignUpForm suf);

	ResponseBody<User> updatePassword(User u, User u2);

}
