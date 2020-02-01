package com.setgreen.setgreencapstoneproject.model.userbase;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import org.hibernate.annotations.NaturalId;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    
    @NaturalId
    @JsonIgnore
    @NotEmpty(message = "Email is required")
    @Column(length = 50)
    private String Email;

//    @NaturalId
//    @JsonIgnore
//    @NotEmpty(message = "Username is required")
//    @Column(length = 50)
//    private String UserName;
    
    @JsonIgnore
    @NotEmpty(message = "Password is required")
    private String Password;

    @NotNull
    private int clearance;
    
    @JsonIgnore
    private Boolean Verified;
}

