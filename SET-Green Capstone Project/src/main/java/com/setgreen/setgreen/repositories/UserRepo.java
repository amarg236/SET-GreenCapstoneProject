package com.setgreen.setgreen.repositories;

import com.setgreen.setgreen.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
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
    
    /**
     * @param who String email of user you want to update (as email is assumed to be a singular key value)
     * @param newPass new password for the user
     */
    @Modifying
    @Query("UPDATE User u set u.password = :newPass WHERE u.email = :who")
    public void updatePassword(@Param("who") String who, @Param("newPass") String newPass);
    
    /** Sets a user to be verified.
     * @param who String email of the user we want to update (as email is assumed to be a key value)
     * @param tf boolean true or false, false "un-regestering" the user, and true verifiying them.
     */
    @Modifying
    @Query("UPDATE User u set verified = :tf WHERE u.email = :who")
    public void updateVerify(@Param("who") String who, @Param("tf") boolean tf);
}
