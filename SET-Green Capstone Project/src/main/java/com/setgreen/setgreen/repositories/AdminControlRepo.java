package com.setgreen.setgreen.repositories;

import com.setgreen.setgreen.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminControlRepo extends JpaRepository<User,Long> {


    @Query(value = "SELECT * FROM user u WHERE u.verified IS NOT TRUE",nativeQuery = true)
    List<User> findUnverifiedUser();


}
