package com.setgreen.setgreencapstoneproject.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @JsonIgnore
    @NotEmpty(message= "First Name is required")
    @Column(length = 50)
    private String FirstName;

    @JsonIgnore
    @NotEmpty(message = "Last Name is required")
    @Column(length = 50)
    private String LastName;

    @JsonIgnore
    @NotEmpty(message = "Email is required")
    @Column(length = 50)
    private String Email;

    @NaturalId
    @JsonIgnore
    @NotEmpty(message = "Username is required")
    @Column(length = 50)
    private String UserName;

    @JsonIgnore
    @NotEmpty(message = "Password is required")
    private String PassWord;

    @JsonIgnore
    @ManyToMany(targetEntity = Role.class)
    private Set<Role> roles = new HashSet<>();

    @JsonIgnore
    private Boolean Verified;

    public User() {

    }
}

