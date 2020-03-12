package com.setgreen.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.model.User;
import com.setgreen.repositories.UserRepo;
import com.setgreen.services.ViewUserService;


@Service
public class ViewUserServiceImpl implements ViewUserService {

    @Autowired
    UserRepo userRepo;



    @Override
    public List<User> ViewUsers() {
        return userRepo.findAll();
    }

}
