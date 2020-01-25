package com.setgreen.setgreencapstoneproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.setgreen.setgreencapstoneproject.model.userbase.User;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, String> {

    @Query("Select p from User p where p.Email = (:email)")
    Optional<User> findByEmail(String email);
}
