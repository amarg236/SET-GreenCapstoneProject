package com.setgreen.setgreencapstoneproject.model.userbase;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class UserProfile extends User{
    @JsonIgnore
    @NotEmpty(message= "First Name is required")
    @Column(length = 50)
    private String FirstName;

    @JsonIgnore
    @NotEmpty(message = "Last Name is required")
    @Column(length = 50)
    private String LastName;
    
    @JsonIgnore
    @Column(length = 50)
    private String AdtnlInfo;

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

	public String getAdtnlInfo() {
		return AdtnlInfo;
	}

	public void setAdtnlInfo(String adtnlInfo) {
		AdtnlInfo = adtnlInfo;
	}
}
