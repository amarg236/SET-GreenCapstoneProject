package com.setgreen.setgreen.payload;

import lombok.Data;

import java.util.List;

import com.setgreen.setgreen.model.Role;

@Data
public class JWTLoginSuccessResponse {
    private boolean success;
    private String token;
    private Object[] roles;

    public JWTLoginSuccessResponse(boolean success, String token, Object[] roles) {
        this.success = success;
        this.token = token;
        this.roles = roles;
    }


}
