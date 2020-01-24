package com.setgreen.setgreencapstoneproject.service.Implementation;



import com.setgreen.setgreencapstoneproject.config.jwt.JWTAuthenticationFilter;
import com.setgreen.setgreencapstoneproject.model.*;
import com.setgreen.setgreencapstoneproject.model.Authentication.UserPrinciple;
import com.setgreen.setgreencapstoneproject.repository.UserRepo;
import com.setgreen.setgreencapstoneproject.service.RoleService;
import com.setgreen.setgreencapstoneproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service

public class UserImpl implements UserDetailsService, UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;






    public UserImpl(){

    }


    @Override
    public ResponseBody Register(SignUpForm signUpForm) {


        Optional<User> optionalUser = userRepo.findByEmail(signUpForm.getEmail());

        if(optionalUser.isPresent()){
            return new ResponseBody(HttpStatus.CREATED.value(),"Email already used!", new User());
        }

        Optional<User> optional = userRepo.findByUserName((signUpForm.getUsername()));
        if(optional.isPresent()){
            return new ResponseBody(HttpStatus.CREATED.value(),"Email already exists!", new User());
        }
        User user = new User();
        try {

            user.setFirstName(signUpForm.getName().split(" ")[0]);
            user.setLastName(signUpForm.getName().split(" ")[1]);
            user.setEmail(signUpForm.getEmail());
            user.setUserName(signUpForm.getUsername());
            user.setPassWord(passwordEncoder.encode(signUpForm.getPassword()));
            user.setVerified(false);
            Set<Role> roles = new HashSet<>();
            for(String role: signUpForm.getRole())
            {
                if(role.equals("Admin")){
                    roles.add(roleService.getRoleByRoleName(RoleName.ADMIN));
                }
                if(role.equals("User")){
                    roles.add(roleService.getRoleByRoleName(RoleName.USER));
                }

            }
            user.setRoles(roles);

            userRepo.save(user);

            return new ResponseBody(HttpStatus.CREATED.value(),"User Successfully Created",new User());
        }
        catch (Exception ex )
        {
            return new ResponseBody(HttpStatus.BAD_REQUEST.value(),"User was not created",new User());
        }


    }

    @Override
    public ResponseBody Login(Login login) {
        User user = userRepo.findByUserNameIgnoreCase(login.getUserName());

        if(user == null){
            return new ResponseBody(HttpStatus.BAD_REQUEST.value(), "Please register first!", new Login());
        }
        if(user.getVerified()) {
            if(Authenticate(login.getPassword(),user.getPassWord())){

                return new ResponseBody(HttpStatus.ACCEPTED.value(),"Successfully logged in", new Login());
            }
        }


        return new ResponseBody(HttpStatus.FORBIDDEN.value(),"Please verify via email", new Login());
    }

    @Override
    public List<User> ViewUsers() {
        return userRepo.findAll();
    }


    public boolean Authenticate(String password, String encodedPassword){
        return BCrypt.checkpw(password, encodedPassword);
    }


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepo.findByUserNameIgnoreCase(s);

        if (user != null)
        {
            return UserPrinciple.build(user);
        }

        return null;
    }
}