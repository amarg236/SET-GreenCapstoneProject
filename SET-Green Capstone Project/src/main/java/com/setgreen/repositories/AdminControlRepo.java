package com.setgreen.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.setgreen.model.User;

public interface AdminControlRepo extends JpaRepository<User,Long> {


    @Query(value = "SELECT * FROM user u WHERE u.verified IS NOT TRUE",nativeQuery = true)
    List<User> findUnverifiedUser();


}
