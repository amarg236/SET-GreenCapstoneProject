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

/* FIXME CLEANUP
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
*/



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
