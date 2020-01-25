package com.setgreen.setgreencapstoneproject.repository;

import com.setgreen.setgreencapstoneproject.model.Role;
import com.setgreen.setgreencapstoneproject.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;

public interface RoleRepo extends JpaRepository<Role, Long > {

    @Query("Select r from Role r where r.role=(:roleName)")
    Role findByRole(RoleName roleName);
}
