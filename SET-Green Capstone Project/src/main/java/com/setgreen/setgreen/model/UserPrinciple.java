package com.setgreen.setgreen.model;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;


@Data
public class UserPrinciple implements UserDetails {

    private static final long serialVersionUID = 1L;
    private Long id;
    private String name;
    //private String username;

    @JsonIgnore
    private String email;

    /**
     * Access setting that means that the property may only be written (set) for
     * deserialization, but will not be read (get) on serialization, that is, the
     * value of the property is not included in serialization.
     */
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrinciple(Long id, String name, /*String username,*/ String email, String password,
                         Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
//        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }


    public static UserPrinciple build(User user){
        //to retrive list of roles for particular user
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRole().name())).collect(Collectors.toList());
        return new UserPrinciple(
                user.getId(),
                user.getFirstname()+" "+ user.getLastname(),
//                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

//    @Override
//    public boolean equals(Object o) {
//        return true;
//    }
//

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        User that = (User) o;
        return Objects.equals(id, that.getId());
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }


	@Override
	public String getUsername() {
		return email;
	}
}
