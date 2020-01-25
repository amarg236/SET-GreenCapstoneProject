package com.setgreen.setgreencapstoneproject.service;

import com.setgreen.setgreencapstoneproject.model.RoleName;
import com.setgreen.setgreencapstoneproject.model.userbase.Role;

public interface RoleService {
    Role getRoleByRoleName(RoleName role);
}
