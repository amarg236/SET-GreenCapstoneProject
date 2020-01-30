package com.setgreen.setgreen.repositories;

import com.setgreen.setgreen.model.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface AdminControlRepo extends JpaRepository<User,Long> {
    User findAllByIdAndVerifiedIsFalse(String username);
}
