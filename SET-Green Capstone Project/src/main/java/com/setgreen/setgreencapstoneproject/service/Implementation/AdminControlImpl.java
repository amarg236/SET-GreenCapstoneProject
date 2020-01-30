package com.setgreen.setgreencapstoneproject.service.Implementation;

import com.setgreen.setgreencapstoneproject.model.User;
import com.setgreen.setgreencapstoneproject.repository.AdminControlRepo;
import com.setgreen.setgreencapstoneproject.service.AdminControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminControlImpl implements AdminControl {

    @Autowired
    private AdminControlRepo adminControlRepo;

    @Override
    public List<User> showUnverifiedUsers() {
        return null;
    }
}
