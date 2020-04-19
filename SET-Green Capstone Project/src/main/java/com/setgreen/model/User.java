package com.setgreen.model;




import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.NaturalId;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;


@Entity
@Data
public class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


  //  @NaturalId
  //  @NotBlank(message = "Username cannot be blank")
  //  private String username;

    @NaturalId
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Username needs to be am email")
    private String email;

    @NotBlank(message = "First name cannot be empty")
    private String firstname;

    @NotBlank(message = "Last name cannot be empty")
    private String lastname;

    @NotBlank(message = "Password cannot be empty")
    private String password;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date create_At;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date update_At;

    //Should be unique
    private int tmpPwd;
    
    @OneToMany(cascade=CascadeType.ALL)
    private Set<Role> roles = new HashSet<>();
    private Boolean Verified;

    public User() {
    }


    public User(SignUpForm suf) {
		email = suf.getEmail();
		firstname = suf.getFirstname();
		lastname = suf.getLastname();
		roles.add(suf.getRole());
	}


	@PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }


    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }
}
