package com.setgreen.setgreencapstoneproject.model;


import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class SignUpForm {


    @NotEmpty(message= "Name must not be empty!")
    private String name;

    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRole() {
		return role;
	}

	public void setRole(Set<String> role) {
		this.role = role;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	@NotEmpty(message= "UserName must not be empty!")
    private String username;

    @NotEmpty(message= "Email must not be empty!")
    private String email;

    @NotEmpty(message= "Password must not be empty!")
    @Size(min= 6, max = 30)
    private String password;

    private Set<String> role;

    private boolean verified = true;


}
