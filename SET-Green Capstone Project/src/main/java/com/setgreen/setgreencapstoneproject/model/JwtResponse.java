package com.setgreen.setgreencapstoneproject.model;

public class JwtResponse {
    private String jwtToken;
    private String username;
    private String role;

    public JwtResponse(String jwt,  String username2, String role) {
        this.jwtToken = jwt;
        this.username = username2;
        this.role = role;
    }
}
