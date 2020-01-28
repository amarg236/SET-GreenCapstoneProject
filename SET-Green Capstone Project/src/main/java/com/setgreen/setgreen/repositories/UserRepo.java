package com.setgreen.setgreen.repositories;

import com.setgreen.setgreen.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Id;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Id> {
    User findByUsername(String username);
    User getById(Long id);

    @Query("Select u from User u where u.username =(:username)")
    User findByUserNameIgnoreCase(String username);
}
