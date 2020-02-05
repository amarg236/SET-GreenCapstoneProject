package com.setgreen.setgreen.controller;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.mailing.MailHandler;
import com.setgreen.setgreen.model.*;
import com.setgreen.setgreen.payload.JWTLoginSuccessResponse;
import com.setgreen.setgreen.payload.LoginRequest;
import com.setgreen.setgreen.repositories.UserRepo;
import com.setgreen.setgreen.security.JwtTokenProvider;
import com.setgreen.setgreen.services.MapValidationErrorService;
import com.setgreen.setgreen.services.UserService;
import com.setgreen.setgreen.services.implementation.RoleServiceImpl;
import com.setgreen.setgreen.services.implementation.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

import static com.setgreen.setgreen.security.SecurityConstants.TOKEN_PREFIX;

@CrossOrigin
@RestController
@RequestMapping("api/auth/")
public class UserController {
//
//    @Autowired
//    private ViewUserService viewUserService;

    @Autowired
    UserRepo userValid; //TODO The UserService should access the UserRepo on behalf of this class, so the security stuff I've marked below should most likely be rolled into the UserService

    @Autowired
    private UserService userService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private RoleServiceImpl roleService;

    @Autowired
    private AuthenticationManager authenticationManager;


//
//    @GetMapping("viewusers")
//    public List<User> getUser(){
//        return viewUserService.ViewUsers();
//
//    }




    @PostMapping("login")
    public ResponseEntity<?> authenticateuser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

         User   user = userValid.findByUserNameIgnoreCase(loginRequest.getUsername());

         if(user == null) return new ResponseEntity<>("Username not found. Please enter correct username.",HttpStatus.BAD_REQUEST);
            if (user.getVerified()) {//TODO Can we make all this authentication part of a private method?
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(),
                                loginRequest.getPassword()
                        )
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

                return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt, authentication.getAuthorities().toArray()));
            }

            return new ResponseEntity<>("Please verify your email first",HttpStatus.BAD_REQUEST);






    }
    
    /**
     * Login using a get request that only accepts non-verified users. After you do this you **REALLY** need to update the users password, but we don't force that to be done innately here.
     * Side note we could most likely do a "forgot password" by de-verifing and re-sending a verification email. It's a bit hacky/lazy, but it'd work.
     * @param loginRequest
     * @param result
     * @return
     */
    @GetMapping("login")
    public ResponseEntity<?> firstTimeLogin(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
    	ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);//TODO CLEAN THIS: I'm just copying 90% of the stuff from the current login method, need to clean this up
        if (errorMap != null) return errorMap;
    	
    	User usr = userValid.findByUsername(loginRequest.getUsername());
    	if(!usr.getVerified()) {//TODO Can we make all this authentication  part of a private method?
    		Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

            return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt, authentication.getAuthorities().toArray()));
    	}
    	return new ResponseEntity<>("Email already verified",HttpStatus.BAD_REQUEST);
    }
    
    /** //TODO This might not need to be in api/auth/ 
     * @param u User object with the new password already set
     * @return ResponseEntity
     */
    @PostMapping("setPassword")
    public ResponseEntity<?> updatePassword(User u){
    	try {
    		if(!u.getVerified().booleanValue()) 
    			userService.updatePassAndVerify(u);
    		else
    			userService.updatePassword(u);
    	}
    	catch(Exception e) {
    		return new ResponseEntity<>("Failure to update password", HttpStatus.BAD_REQUEST);
    	}
    	return new ResponseEntity<>("Password Updated!", HttpStatus.ACCEPTED);
    }


    /**
     * @param newUser New user object, must not be blank.
     * @param result for error binding //TODO get Sonom to explain this one better
     * @return ResponseEntity that represents the status of the registration attempt
     */
    @PostMapping("createuser")
    public ResponseEntity<?> addNewUser(@Valid @RequestBody SignUpForm newUser, BindingResult result) //TODO this may need to go in the mail controller
    {


        //TODO in future validate password match

//        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
//        if(errorMap != null) return errorMap;

        Set<Role> roles = new HashSet<>();
        User userData = new User();

        for(String s: newUser.getRole()){
            if(s.equals("ADMIN")){
                roles.add(roleService.getRoleByRoleName(RoleName.ADMIN));
            }
            else if(s.equals("USER")){
                roles.add(roleService.getRoleByRoleName(RoleName.USER));
            }
            else{
                return new ResponseEntity<>("Role not valid", HttpStatus.BAD_REQUEST);

            }
        }
        userData.setPassword(newUser.getPassword());
        userData.setUsername(newUser.getUsername());
        userData.setLastname(newUser.getLastname());
        userData.setFirstname(newUser.getFirstname());
        userData.setEmail(newUser.getEmail());
        userData.setRoles(roles);
        
        try{
        	userService.saveUser(userData);
        	MailHandler m = new MailHandler();
        	m.inviteUser(userData.getEmail());
        }
        catch(Exception e) {
        	return new ResponseEntity<>("Error saving user", HttpStatus.BAD_REQUEST);
        }

        //User createUser = userService.saveUser(userData);
        return new ResponseEntity<>("User has been registered successfully!", HttpStatus.CREATED);
    }







}
