package com.setgreen.services;

import java.util.List;

import com.setgreen.model.User;

public interface AdminControlService {
    List<User> viewUnverifiedUser();
    Boolean setVerified(String username);
}
