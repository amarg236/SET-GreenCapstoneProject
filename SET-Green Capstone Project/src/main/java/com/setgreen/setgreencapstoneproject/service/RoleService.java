package com.setgreen.setgreencapstoneproject.service;

import com.setgreen.setgreencapstoneproject.model.Role;
import com.setgreen.setgreencapstoneproject.model.RoleName;

public interface RoleService {
    Role getRoleByRoleName(RoleName role);
}
