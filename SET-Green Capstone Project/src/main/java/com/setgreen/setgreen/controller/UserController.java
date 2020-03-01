package com.setgreen.setgreen.controller;

import static com.setgreen.setgreen.security.SecurityConstants.TOKEN_PREFIX;

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

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.SignUpForm;
import com.setgreen.setgreen.model.User;
import com.setgreen.setgreen.payload.JWTLoginSuccessResponse;
import com.setgreen.setgreen.payload.LoginRequest;
import com.setgreen.setgreen.security.JwtTokenProvider;
import com.setgreen.setgreen.services.MapValidationErrorService;
import com.setgreen.setgreen.services.UserService;
import com.setgreen.setgreen.services.implementation.CustomUserDetailsService;
import com.setgreen.setgreen.util.DataObject;
import com.setgreen.setgreen.util.Debugger;

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

         ResponseBody<User> rb = userService.loginAttempt(loginRequest); //TESTME userValid.findByEmail(loginRequest.getUsername());
         System.out.print(rb);//TODO Debug remove
         User user = null;
         if(rb.getHttpStatusCode() == HttpStatus.ACCEPTED.value()) {
        	 user = rb.getResult();
         }
        
         if(user == null) return new ResponseEntity<>("Username not found. Please enter correct username.",HttpStatus.BAD_REQUEST);
            if (user.getVerified()) {//XXX ENCAPSULATE. This is shared here and the other login method, it should be its own method
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
    	 ResponseBody<User> rb = userService.loginAttempt(loginRequest); //TESTME userValid.findByEmail(loginRequest.getUsername());
         Debugger.cout(rb.toString());
         User usr = null;
         UserDetails uds = null;
         if(rb.getHttpStatusCode() == HttpStatus.ACCEPTED.value()) {
        	 usr = rb.getResult();
        	 uds = ud.loadUserByUsername(usr.getEmail());
         }
    	try {
    		//To get around null checking we test to see if the user is not verified.
    		//If the user is not verified or their value is null we throw an error and the catch allows them to log in.
    		//XXX MAKE verified FALSE BY DEFAULT. Then I wouldn't have to do this hackass solution.
    		if(!usr.getVerified()) {
    			throw new Exception("User Not Verified");
    		}
    	}
    	catch(Exception e) {
    		Debugger.cout("\n>>"+usr.toString()+"\n>>"+loginRequest.getPassword()+"\n>>>>"+uds.toString());
    		Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                    		loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
    		Debugger.cout("/n>>>"+authentication.toString());

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

            return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt, authentication.getAuthorities().toArray()));
    	}
    	return new ResponseEntity<>("Email already verified",HttpStatus.BAD_REQUEST);
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


    /**
     * @param newUser New user object, must not be blank.
     * @param result for error binding //TODO get Sonom to explain this one better
     * @return ResponseEntity that represents the status of the registration attempt
     */
    @PostMapping("createuser")
    public ResponseBody<User> addNewUser(@Valid @RequestBody SignUpForm suf, Authentication auth, BindingResult result) {
    	return hlp.getRole(auth).inviteUser(suf);
    }
    
    /**
     * @param s Email to search for
     * @return Responsebody with a user by that email if it exists, null otherwise
     */
    @PostMapping("find/email")
    public ResponseBody<User> getByEmail(@RequestBody DataObject<String> s) {
    	return userService.fetchByEmail(s.getData());
    }



    @GetMapping("jsonData")
    public List<Game> getJsonData(){
        return gameHandler.JsonGetAll();
    }
}
