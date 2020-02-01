package com.setgreen.setgreen.repositories;

import com.setgreen.setgreen.model.Role;
import com.setgreen.setgreen.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByRole(RoleName role);
}
