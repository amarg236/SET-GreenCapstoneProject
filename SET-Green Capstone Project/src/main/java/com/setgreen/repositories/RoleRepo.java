package com.setgreen.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.model.Role;
import com.setgreen.model.RoleName;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByRole(RoleName role);

	//@Query("SELECT u.email FROM User u JOIN Role r ON u.email=r.eml AND r.dst=(:ad) AND r.schl=(:sn)")
    Iterable<Role> findByUserEmail(String sn);
}
