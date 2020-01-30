package com.setgreen.setgreencapstoneproject.repository;

import com.setgreen.setgreencapstoneproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminControlRepo extends JpaRepository<User,Long> {

    User findByUserNameAndVerifiedIsFalse(String username);

}
