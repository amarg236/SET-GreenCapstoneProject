package com.setgreen.setgreen.services.implementation;

import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.model.UserPrinciple;
import com.setgreen.setgreen.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.attribute.UserPrincipal;

@Service
public class CustomUserDetailsService implements UserDetailsService {

   @Autowired
   private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if(user == null) new UsernameNotFoundException("User not found");
        return UserPrinciple.build(user);
    }

    //We need this when we find user by id while filtering
    @Transactional
    public UserDetails loadUserById(Long id){
        User user = userRepo.getById(id);
        if(user==null) new UsernameNotFoundException("User not found");
        return UserPrinciple.build(user);

    }
}
