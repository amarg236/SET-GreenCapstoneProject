package com.setgreen.setgreen.services.implementation;

import com.setgreen.setgreen.model.Role;
import com.setgreen.setgreen.model.RoleName;
import com.setgreen.setgreen.repositories.RoleRepo;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
