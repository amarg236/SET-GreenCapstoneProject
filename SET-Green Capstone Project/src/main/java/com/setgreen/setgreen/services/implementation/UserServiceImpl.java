package com.setgreen.setgreen.services.implementation;

import com.setgreen.setgreen.exceptions.UsernameAlreadyExistsException;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.repositories.UserRepo;
import com.setgreen.setgreen.services.UserService;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    public User saveUser(User newUser){
        try{
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setEmail(newUser.getEmail());
            return userRepo.save(newUser);
        }
        catch (Exception e) {
            throw new UsernameAlreadyExistsException("Email '" + newUser.getEmail() + "' already exists"); //TODO TRACK DOWN USERNAME STUFF AND CHANGE IT TO EMAIL
        }

    }
    
    public ResponseBody fetchByEmail(String s) {
    	try {
    		System.out.println(s);
    		User u = userRepo.findByEmail(s);
    		System.out.println(u);
    		u.setPassword("no dice m8");
    		return new ResponseBody(HttpStatus.ACCEPTED.value(), "Found user", u);
    	}
    	catch(Exception e) {
    		return new ResponseBody(HttpStatus.NOT_MODIFIED.value(), "No user found", new User());
    	}
    }
    
    @Override
    /** Updates a password for a user u
     * @param u User object that you most likely created exclusively to update another already existing user object
     */
    public void updatePassword(User u) {
    	userRepo.updatePassword(u.getEmail(), bCryptPasswordEncoder.encode(u.getPassword()));
    	
    }

    @Transactional
    /** Updates the password for a user AND sets the user to be verified
     * @param u User object, already possessing the new password.
     */
    public void updatePassAndVerify(User u) {

    	updatePassword(u);
    	userRepo.updateVerify(u.getEmail(), true);
    }



}
