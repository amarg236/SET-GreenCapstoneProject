package com.setgreen.setgreen.services.implementation;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.repositories.AdminControlRepo;
import com.setgreen.setgreen.repositories.UserRepo;
import com.setgreen.setgreen.services.AdminControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
import java.util.List;

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
        User checkUser = userRepo.findByUserNameIgnoreCase(username);
        System.out.println(checkUser.getUsername());
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
