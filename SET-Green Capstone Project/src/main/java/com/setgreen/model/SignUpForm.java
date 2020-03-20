package com.setgreen.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class SignUpForm {
    @NotEmpty(message= "First Name must not be empty!")
    private String firstname;

    @NotEmpty(message= "Last Name must not be empty!")
    private String lastname;

    @NotEmpty(message= "Email must not be empty!")
    private String email;

    //@NotEmpty(message= "Password must not be empty!")
    //@Size(min= 6, max = 30)
    private String password;
    
    @NotNull(message="User must have a role!")
    private Role role;

    private boolean verified = false;

}
