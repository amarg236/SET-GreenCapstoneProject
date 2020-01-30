package com.setgreen.setgreencapstoneproject.service;

import com.setgreen.setgreencapstoneproject.model.User;

import java.util.List;

public interface AdminControl {
    List<User> showUnverifiedUsers();
}
