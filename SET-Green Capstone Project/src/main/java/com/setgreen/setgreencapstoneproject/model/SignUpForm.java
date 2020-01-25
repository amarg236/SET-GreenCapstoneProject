/*
 *Depricated in favor of handling raw user objects. -Brendon
package com.setgreen.setgreencapstoneproject.model;


import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class SignUpForm {


//    @NotEmpty(message= "Name must not be empty!")
//    private String name;

//    @NotEmpty(message= "UserName must not be empty!")
//    private String username;

    @NotEmpty(message= "Email must not be empty!")
    private String email;

//    @NotEmpty(message= "Password must not be empty!")
//    @Size(min= 6, max = 30)
//    private String password;

    private Set<String> role;

    private boolean verified = true;


}
*/