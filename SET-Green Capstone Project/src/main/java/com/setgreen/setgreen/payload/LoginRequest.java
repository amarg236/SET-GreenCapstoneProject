package com.setgreen.setgreen.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author Sonam Gurung
 *	Takes a Username and Password.
 *	Is essentially a simplified User object for login requests.
 */
@Data
public class LoginRequest {
    @NotBlank(message = "Username cannot be blank")
    private String username;

    @NotBlank(message = "Password can not be blank")
    private String password;
}
