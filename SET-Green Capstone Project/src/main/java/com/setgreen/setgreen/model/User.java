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

    @JsonIgnore
    @ManyToMany(targetEntity = Role.class)
    private Set<Role> roles = new HashSet<>();

    @JsonIgnore
    private Boolean Verified;

    public User() {
    }


    @PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }


    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
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
