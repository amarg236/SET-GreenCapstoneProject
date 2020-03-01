package com.setgreen.setgreen.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.repositories.UserRepo;
import com.setgreen.setgreen.services.ViewUserService;


@Service
public class ViewUserServiceImpl implements ViewUserService {

    @Autowired
    UserRepo userRepo;



    @Override
    public List<User> ViewUsers() {
        return userRepo.findAll();
    }

}
