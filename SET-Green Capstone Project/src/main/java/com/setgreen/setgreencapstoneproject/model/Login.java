package com.setgreen.setgreencapstoneproject.model;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class Login {

    @NotEmpty(message = "Username is required")
    private String userName;

    @NotEmpty(message = "Password is required")
    private String password;
}

