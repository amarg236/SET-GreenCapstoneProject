package com.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.model.Role;
import com.setgreen.model.RoleName;
import com.setgreen.repositories.RoleRepo;

@Service
public class RoleServiceImpl {

    @Autowired
    RoleRepo roleRepo;


    public Role getRoleByRoleName(RoleName role) {
        return roleRepo.findByRole(role);
    }


	public Iterable<Role> findByEmail(String eml) {
		return roleRepo.findByUserEmail(eml);
	}
}
