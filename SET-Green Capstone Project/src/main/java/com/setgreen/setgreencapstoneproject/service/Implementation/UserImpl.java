package com.setgreen.setgreencapstoneproject.service.Implementation;




import com.setgreen.setgreencapstoneproject.model.*;
import com.setgreen.setgreencapstoneproject.model.userbase.User;
import com.setgreen.setgreencapstoneproject.repository.UserRepo;
import com.setgreen.setgreencapstoneproject.repository.UserProfileRepo;
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
import java.util.List;
import java.util.Optional;

//Unused imports we may need later
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;
import com.setgreen.setgreencapstoneproject.config.jwt.JWTAuthenticationFilter;
import com.setgreen.setgreencapstoneproject.model.Authentication.UserPrinciple;
import com.setgreen.setgreencapstoneproject.model.userbase.UserProfile;

@Service

public class UserImpl implements UserDetailsService, UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    UserProfileRepo uProfileRepo;
    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    public UserImpl(){

    }


    /**
     *Rewriting to follow this flow:
     *	Admin enters User's email > Admin Sends Email to user > User gets and clicks link from email > user puts in first name and password > We set user as verified 
    @Override
    public ResponseBody Register(SignUpForm signUpForm) {


        Optional<User> optionalUser = userRepo.findByEmail(signUpForm.getEmail());

        if(optionalUser.isPresent()){
            return new ResponseBody(HttpStatus.CREATED.value(),"Email already used!", new User());
        }

        Optional<UserProfile> optional = userProfileRepo.findByUserName((signUpForm.getUsername()));
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
    */
    
    //Called when the ADMIN registers a user
    //Note that we have NO user access permission checking yet.
    @Override
    public ResponseBody Register(User usr){
    	Optional<User> optionalUser = userRepo.findByEmail(usr.getEmail());

        if(optionalUser.isPresent()){
            return new ResponseBody(HttpStatus.CREATED.value(),"Email already used!", new User());
        }
        try {
//            user.setFirstName(signUpForm.getName().split(" ")[0]); //No reason for admin to set this
//            user.setLastName(signUpForm.getName().split(" ")[1]);
//            user.setEmail(signUpForm.getEmail());
//            user.setUserName(signUpForm.getUsername());
//            user.setPassWord(passwordEncoder.encode(signUpForm.getPassword()));
//            user.setVerified(false);
//            Set<Role> roles = new HashSet<>();
//            for(String role: usr.getClearance())
//            {
//                if(role.equals("Admin")){
//                    roles.add(roleService.getRoleByRoleName(RoleName.ADMIN));
//                }
//                if(role.equals("User")){
//                    roles.add(roleService.getRoleByRoleName(RoleName.USER));
//                }
//
//            }

            userRepo.save(usr);

            return new ResponseBody(HttpStatus.CREATED.value(),"User Successfully Created",new User());
        }
        catch (Exception ex )
        {
            return new ResponseBody(HttpStatus.BAD_REQUEST.value(),"User was not created",new User());
        }
    }

    /**verifies a user and saves their profile and their useraccount
     * @param usr user profile
     * @return HTTP status, message, and a blank user
     */
    public ResponseBody verifyUser(UserProfile usr) {
    	try {
    		User ref = userRepo.findByEmail(usr.getEmail()).get();
    		ref.setPassWord(usr.getPassWord());
    		ref.setVerified(true);
    		userRepo.save(ref);
    		uProfileRepo.save(usr);
    		return new ResponseBody(HttpStatus.CREATED.value(),"Account Verified",new User());
    	}
    	catch (Exception e) {
    		//TODO add admin contact info to response
    		return new ResponseBody(HttpStatus.BAD_REQUEST.value(),"Account Could Not Be Verified",new User());
    	}
    }
    
    public ResponseBody Login(Login login) {
    	return null; //TODO get rid of this stub
    }
	/*TODO fix this.
	 * 
	 * @Override
	 * public ResponseBody Login(Login login) { User user =
	 * uProfileRepo.findByEmailIgnoreCase(login.getUserName());
	 * 
	 * if(user == null){ return new ResponseBody(HttpStatus.BAD_REQUEST.value(),
	 * "Please register first!", new Login()); } if(user.getVerified()) {
	 * if(Authenticate(login.getPassword(),user.getPassWord())){
	 * 
	 * return new ResponseBody(HttpStatus.ACCEPTED.value(),"Successfully logged in",
	 * new Login()); } }
	 * 
	 * 
	 * return new
	 * ResponseBody(HttpStatus.FORBIDDEN.value(),"Please verify via email", new
	 * Login()); }
	 */

    @Override
    public List<User> ViewUsers() {
        return userRepo.findAll();
    }


    public boolean Authenticate(String password, String encodedPassword){
        return BCrypt.checkpw(password, encodedPassword);
    }


//TODO what ever this does It broke some where or another
//    @Override
//    @Transactional
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//        UserProfile user = uProfileRepo.findByUserNameIgnoreCase(s);
//
//        if (user != null)
//        {
//            return UserPrinciple.build(user);
//        }
//
        return null;
    }
}