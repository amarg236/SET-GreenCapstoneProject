package com.setgreen.services;

import com.setgreen.model.ResponseBody;
import com.setgreen.model.SignUpForm;
import com.setgreen.model.User;
import com.setgreen.payload.LoginRequest;

public interface UserService {

	ResponseBody<User> updatePassAndVerify(User u, User u2);
	
	public ResponseBody<User> fetchByEmail(String s);
	
	public ResponseBody<User> loginAttempt(LoginRequest l);

	ResponseBody<User> updateProfile(User u);

	ResponseBody<User> saveUser(SignUpForm suf);

	ResponseBody<User> updatePassword(User u, User u2);

	ResponseBody<User> deleteUser(User u);

	ResponseBody<User> verifyUser(User u, boolean toSet);

	void forgotPassword(String email);
	
	void zeroTempPassword(String email);

	ResponseBody<User> resetForgotPassword(String pw);

}
