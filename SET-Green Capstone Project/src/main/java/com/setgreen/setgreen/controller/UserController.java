package com.setgreen.setgreen.controller;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.*;
import com.setgreen.setgreen.payload.JWTLoginSuccessResponse;
import com.setgreen.setgreen.payload.LoginRequest;
import com.setgreen.setgreen.repositories.UserRepo;
import com.setgreen.setgreen.security.JwtTokenProvider;
import com.setgreen.setgreen.services.MapValidationErrorService;
import com.setgreen.setgreen.services.UserService;
import com.setgreen.setgreen.services.MailService.MailHandler;
import com.setgreen.setgreen.services.implementation.GameHandler;
import com.setgreen.setgreen.services.implementation.RoleServiceImpl;
import com.setgreen.setgreen.services.implementation.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
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

    private UserRepo userValid; //TODO The UserService should access the UserRepo on behalf of this class, so the security stuff I've marked below should most likely be rolled into the UserService

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

    @Autowired
    private GameHandler gameHandler;


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

         User   user = userValid.findByEmail(loginRequest.getUsername());

         if(user == null) return new ResponseEntity<>("Username not found. Please enter correct username.",HttpStatus.BAD_REQUEST);
            if (user.getVerified()) {//XXX ENCAPSULATE. This is shared here and the other login method, it should be its own method
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getUsername(), //FIXME USERNAME->EMAIL I do ***NOT*** want to login via a username, as we (should) key on emails (as one email can't have 2 accounts) and coaches do good to remember their email without needing a separate username.
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
     * //@param loginRequest
     * //@param result
     * //@return
     */
    @GetMapping("login")//TODO REDIRECT this should really print out a redirect for html and have them go to a reset password place or something.
    public ResponseEntity<?> firstTimeLogin(@RequestParam(value="u") String u, @RequestParam(value="p") String p) {
    	LoginRequest loginRequest = new LoginRequest();//Hacks on hacks.
    	loginRequest.setPassword(p);
    	loginRequest.setUsername(u);
    	User usr = userValid.findByEmail(loginRequest.getUsername());
    	try {
    		//To get around null checking we test to see if the user is not verified.
    		//If the user is not verified or their value is null we throw an error and the catch allows them to log in.
    		//XXX MAKE verified FALSE BY DEFAULT. Then I wouldn't have to do this hackass solution.
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
    
    /** //TODO This might not need to be in api/auth/ 
     * @param u User object with the new password already set
     * @return ResponseEntity
     */
    @PostMapping("setPassword")
    public ResponseEntity<?> updatePassword(@RequestBody User u){
    	//try {//If we don't send verified we crash, so we'd have to do a user query, and I'd rather just update the password and verify everyone.
    		//if(!u.getVerified().booleanValue()) 
    			userService.updatePassAndVerify(u);//TODO Add password checking (for security)
    		//else
    		//	userService.updatePassword(u);
    	//}
    	//catch(Exception e) {
    	//	return new ResponseEntity<>("Failure to update password", HttpStatus.BAD_REQUEST);
    	//}
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


        //TODO check for when no role present, also check that the typing is right on roles (admin can create anyone, assigner creates users, users aren't allowed)

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
//        userData.setUsername(newUser.getUsername());
        userData.setLastname(newUser.getLastname());
        userData.setFirstname(newUser.getFirstname());
        userData.setEmail(newUser.getEmail());
        userData.setRoles(roles);
        
        try{
        	MailHandler m = new MailHandler(new JavaMailSenderImpl());
        	userData.setPassword(m.genLink());
        	m.sendMailMessage(m.inviteUser(userData));
        	userService.saveUser(userData);
        }
        catch(Exception e) {
        	return new ResponseEntity<>("Error saving user"+e, HttpStatus.BAD_REQUEST);
        }

        //User createUser = userService.saveUser(userData);
        return new ResponseEntity<>("User has been registered successfully!", HttpStatus.CREATED);
    }
    
    @PostMapping("find/email")
    public ResponseBody getByEmail(@RequestBody String s) {
    	return userService.fetchByEmail(s);
    }



    @GetMapping("jsonData")
    public List<Game> getJsonData(){
        return gameHandler.JsonGetAll();
    }
}
