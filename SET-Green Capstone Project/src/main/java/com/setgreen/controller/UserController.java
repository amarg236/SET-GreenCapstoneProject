package com.setgreen.controller;

import static com.setgreen.security.SecurityConstants.TOKEN_PREFIX;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.model.ResponseBody;
import com.setgreen.model.SignUpForm;
import com.setgreen.model.User;
import com.setgreen.payload.JWTLoginSuccessResponse;
import com.setgreen.payload.LoginRequest;
import com.setgreen.payload.PasswordChangeRequest;
import com.setgreen.security.JwtTokenProvider;
import com.setgreen.services.MapValidationErrorService;
import com.setgreen.services.UserService;
import com.setgreen.services.implementation.CustomUserDetailsService;
import com.setgreen.util.DataObject;
import com.setgreen.util.Debugger;

/**
 * @author Brendon LeBaron and Sonam Gurang
 * Controller for user interaction. Not security checked
 */
@CrossOrigin
@RestController
@RequestMapping("api/auth/")
public class UserController {
	@Autowired
	ControllerAssistant hlp;
    @Autowired
    private UserService userService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService ud;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * @param loginRequest Takes a Username and Password
     * @param result For binding result of request
     * @return ResponseEntity that asks to either verify email, or a JWT login token
     */
    @PostMapping("login")
    public ResponseEntity<?> authenticateuser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

         ResponseBody<User> rb = userService.loginAttempt(loginRequest);
         User user = null;
         if(rb.getHttpStatusCode() == HttpStatus.ACCEPTED.value()) {
        	 user = rb.getResult();
         }
        
         if(user == null) return new ResponseEntity<>("Username not found. Please enter correct username.",HttpStatus.BAD_REQUEST);
         if(user.getTmpPwd() != 0) {
 			userService.zeroTempPassword(user.getEmail());
 		}
            if (user.getVerified()) {
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
     * @param loginRequest Username and Password
     * @param result For binding result
     * @return A message saying email is already verified or a JWT token
     */
    @GetMapping("login")
    public ResponseEntity<?> firstTimeLogin(@RequestParam(value="u") String u, @RequestParam(value="p") String p) {
    	LoginRequest loginRequest = new LoginRequest();//Hacks on hacks.
    	loginRequest.setPassword(p);
    	loginRequest.setUsername(u);
    	 ResponseBody<User> rb = userService.loginAttempt(loginRequest);
         Debugger.cout(rb.toString());
         User usr = null;
         UserDetails uds = null;
         if(rb.getHttpStatusCode() == HttpStatus.ACCEPTED.value()) {
        	 usr = rb.getResult();
        	 uds = ud.loadUserByUsername(usr.getEmail()); //TODO WHY IS THIS HERE?
         }
    	try {
    		//To get around null checking we test to see if the user is not verified.
    		//If the user is not verified or their value is null we throw an error and the catch allows them to log in.
    		if(!usr.getVerified()) {
    			throw new Exception("User Not Verified");
    		}
    	}
    	catch(Exception e) {
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
    @PostMapping("forgotPassword") //{"email":someText}
    public void forgotMePassword(@RequestBody User u) {
    	userService.forgotPassword(u.getEmail());
    }
    @PostMapping("resetPassword") //{"newPassword"="new account password", "accessKey"="pwd from url"}
    public ResponseBody<User> resetPassword(@RequestBody PasswordChangeRequest p){
    	return userService.resetForgotPassword(p);
    }
    @GetMapping("resetPassword") // .../resetPassword?pwd=[tempPassword]
    public ResponseBody<User> resetPassword(@RequestParam("pwd") String pwd){
	     ResponseBody<User> rb = userService.getByTmpPwd(pwd);
	     User u = rb.getResult();
	     u.setPassword("-");
	     rb.setResult(u);
	     return rb;
    }
    /**
     * @param u User object with the new password already set
     * @return ResponseEntity
     */
    @PostMapping("setPassword")
    public ResponseBody<User> updatePassword(@RequestBody User u, Authentication auth){
    	User u2 = new User();
    	if(auth.isAuthenticated())
    		u2.setEmail(auth.getName());
    	return userService.updatePassAndVerify(u, u2);
    }
    
    @PostMapping("edit")
    public ResponseBody<User> editDetails(@RequestBody User u, Authentication auth){
    	u.setEmail(auth.getName());
    	return userService.updateProfile(u);
    }

    /**
     * @param newUser New user object, must not be blank.
     * @param result for error binding
     * @return ResponseEntity that represents the status of the registration attempt
     */
    @PostMapping("createuser")
    public ResponseBody<User> addNewUser(@Valid @RequestBody SignUpForm suf, Authentication auth, BindingResult result) {
    	return hlp.getRoleByBest(auth).inviteUser(suf);
    }
    
    /**
     * @param s Email to search for
     * @return Responsebody with a user by that email if it exists, null otherwise
     */
    //FIXME Remove or secure
    @PostMapping("find/email")
    public ResponseBody<User> getByEmail(@RequestBody DataObject<String> s) {
    	return userService.fetchByEmail(s.getData());
    }
}
