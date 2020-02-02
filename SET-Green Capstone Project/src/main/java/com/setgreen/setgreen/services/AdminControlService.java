package com.setgreen.setgreen.services;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.User;

import java.util.List;

public interface AdminControlService {
    List<User> viewUnverifiedUser();
    Boolean setVerified(String username);
}
