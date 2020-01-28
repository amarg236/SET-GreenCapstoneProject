package com.setgreen.setgreen.model;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class SignUpForm {
    @NotEmpty(message= "First Name must not be empty!")
    private String firstname;

    @NotEmpty(message= "Last Name must not be empty!")
    private String lastname;

    @NotEmpty(message= "UserName must not be empty!")
    private String username;

    @NotEmpty(message= "Email must not be empty!")
    private String email;

    @NotEmpty(message= "Password must not be empty!")
    @Size(min= 6, max = 30)
    private String password;

    private Set<String> role;

    private boolean verified = false;

}
