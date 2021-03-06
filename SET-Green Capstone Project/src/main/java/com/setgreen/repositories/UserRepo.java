package com.setgreen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.setgreen.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
//    User findByUsername(String username);
//    User findById(Long id);

//    @Query("Select u from User u where u.username =(:username)")
//    User findByUserNameIgnoreCase(String username);
    
    @Query("SELECT u from User u where u.email =(:email)")
    public User findByEmail(String email);
    
    /**
     * @param who String email of user you want to update (as email is assumed to be a singular key value)
     * @param newPass new password for the user
     */
    @Modifying
    @Query("UPDATE User u set u.password = (:newPass) WHERE u.email = (:who)")
    public void updatePassword(@Param("who") String who, @Param("newPass") String newPass);
    
    /** Sets a user to be verified.
     * @param who String email of the user we want to update (as email is assumed to be a key value)
     * @param tf boolean true or false, false "un-regestering" the user, and true verifiying them.
     */
    @Modifying
    @Query("UPDATE User u set verified = (:tf) WHERE u.email = (:who)")
    public void updateVerify(@Param("who") String who, @Param("tf") boolean tf);

    @Modifying
    @Query("UPDATE User u set firstname = (:fn), lastname = (:ln) WHERE u.id = (:who)")
	public void updateName( @Param("fn") String firstname, @Param("ln") String lastname, @Param("who") Long id);

    @Modifying
    @Query("UPDATE User u set verified = (:tf) WHERE u.email = (:who)")
	public void updateVerify(@Param("who") Long id, @Param("tf") boolean toSet);

    @Modifying
    @Query("UPDATE User u set tmpPwd = (:hc) WHERE u.id = (:who)")
	public void updateTmpPwd(@Param("who") Long id, @Param("hc") int hashCode);

	public User findByTmpPwd(int i);


}
