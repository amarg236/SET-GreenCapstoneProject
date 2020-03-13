package com.setgreen.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.model.User;
import com.setgreen.repositories.AdminControlRepo;
import com.setgreen.repositories.UserRepo;
import com.setgreen.services.AdminControlService;

@Service
public class AdminControlServiceImpl implements AdminControlService {

    @Autowired
    private AdminControlRepo adminControlRepo;

    @Autowired
    private UserRepo userRepo;


    @Override
    public List<User> viewUnverifiedUser() {

        return adminControlRepo.findUnverifiedUser();
    }

    @Override
    public Boolean setVerified(String username) {
        System.out.println(username);
        User checkUser = userRepo.findByEmail(username);
        System.out.println(checkUser.getEmail());
        if(checkUser != null){

            checkUser.setVerified(Boolean.TRUE);
            adminControlRepo.save(checkUser);
            return true;
//            return new ResponseBody(HttpStatus.CREATED.value(),"Successfully verified user", new User());
        }
        return false;
        //return new ResponseBody(HttpStatus.BAD_REQUEST.value(),"Please check username and try again", new User());


    }


}
