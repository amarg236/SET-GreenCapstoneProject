package com.setgreen.setgreen.model;




import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.NaturalId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


import java.util.*;
import java.util.stream.Collectors;


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


    @OneToMany(cascade=CascadeType.ALL)
    private Set<Role> roles = new HashSet<>();//TODO figure out why UserPrinciple needs this.

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


	public RoleName getRoles(District d, Iterable<Role> iterable) {
		for(Role x : iterable) {
			//XXX we abuse short circuit logic here (in that if an admin is found we take it) to avoid potential "no district exists" errors for our admin.
			if(x.getRole().userLevel() >= 12000 || x.getDistrictName().equals(d.getDistrictName())) {
				System.out.println(x.toString());
				return x.getRole();
			}
		}
		return RoleName.UNFOUND;
	}




//    User details interface methods

//    @Override
//    @JsonIgnore
//    public Collection<? extends GrantedAuthority> getAuthorities(User user) {
//
//
//        List<GrantedAuthority> authorities = user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRole().name())).collect(Collectors.toList());
//
//        return new UserPrinciple(user.getId(), (user.getFirstName()+" "+user.getLastName()),user.getUserName(),user.getEmail(),user.getPassWord(),authorities);
//    }
//    }
//
//    @Override
//    @JsonIgnore
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    @JsonIgnore
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    @JsonIgnore
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    @JsonIgnore
//    public boolean isEnabled() {
//        return true;
//    }
}
