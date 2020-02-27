package com.setgreen.setgreen.services;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.payload.LoginRequest;

public interface UserService {

	ResponseBody<User> updatePassword(User u, String h);

	ResponseBody<User> updatePassAndVerify(User u, String h);
	
	public ResponseBody<User> fetchByEmail(String s);
	
	public ResponseBody<User> loginAttempt(LoginRequest l);

	ResponseBody<User> updateProfile(User u);

	ResponseBody<User> saveUser(SignUpForm suf);

	User getByToken(String a);
}
