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
public class User implements UserService{

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
    
    public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getFirstName() {
		return FirstName;
	}

	public void setFirstName(String firstName) {
		FirstName = firstName;
	}

	public String getLastName() {
		return LastName;
	}

	public void setLastName(String lastName) {
		LastName = lastName;
	}

	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public String getUserName() {
		return UserName;
	}

	public void setUserName(String userName) {
		UserName = userName;
	}

	public String getPassWord() {
		return PassWord;
	}

	public void setPassWord(String passWord) {
		PassWord = passWord;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Boolean getVerified() {
		return Verified;
	}

	public void setVerified(Boolean verified) {
		Verified = verified;
	}
}

