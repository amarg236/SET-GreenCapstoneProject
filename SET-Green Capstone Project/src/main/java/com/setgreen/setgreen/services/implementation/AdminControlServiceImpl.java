package com.setgreen.setgreen.services.implementation;

import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.services.AdminControlService;
import com.setgreen.setgreencapstoneproject.repository.AdminControlRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminControlServiceImpl implements AdminControlService {


    @Override
    public List<User> showUnverifiedUsers() {
        return null;
    }
}
