package com.setgreen.setgreen.services;

import com.setgreen.setgreen.model.User;

public interface UserService {

    User saveUser(User user);

	void updatePassword(User u);

	void updatePassAndVerify(User u);

}
