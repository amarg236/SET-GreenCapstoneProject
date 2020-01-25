package com.setgreen.setgreencapstoneproject.repository;

import com.setgreen.setgreencapstoneproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, String> {

    @Query("Select p from User p where p.Email = (:email)")
    Optional<User> findByEmail(String email);


    @Query("Select u from User u where u.UserName =(:username)")
    Optional<User> findByUserName(String username);

    @Query("Select u from User u where u.UserName =(:username)")
    User findByUserNameIgnoreCase(String username);


}
