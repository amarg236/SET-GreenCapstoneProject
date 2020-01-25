package com.setgreen.setgreencapstoneproject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.setgreen.setgreencapstoneproject.model.userbase.UserProfile;

public interface UserProfileRepo extends CrudRepository<UserProfile, Long>{
//    @Query("Select u from User u where u.UserName =(:username)")
//    Optional<UserProfile> findByUserName(String username);

//    @Query("Select u from User u where u.UserName =(:username)")
//    UserProfile findByUserNameIgnoreCase(String username);
}
