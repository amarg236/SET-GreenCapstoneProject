package com.setgreen.setgreen.services;

import java.util.List;

import com.setgreen.setgreen.model.User;

public interface AdminControlService {
    List<User> viewUnverifiedUser();
    Boolean setVerified(String username);
}
