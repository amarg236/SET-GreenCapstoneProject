package com.setgreen.setgreencapstoneproject.service.Implementation;

import com.setgreen.setgreencapstoneproject.model.Role;
import com.setgreen.setgreencapstoneproject.model.RoleName;
import com.setgreen.setgreencapstoneproject.repository.RoleRepo;
import com.setgreen.setgreencapstoneproject.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepo roleRepo;

    @Override
    public Role getRoleByRoleName(RoleName role) {
        return roleRepo.findByRole(role);
    }
}
