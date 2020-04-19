package com.setgreen.services.implementation;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.setgreen.model.ResponseBody;
import com.setgreen.model.Role;
import com.setgreen.model.SignUpForm;
import com.setgreen.model.User;
import com.setgreen.payload.LoginRequest;
import com.setgreen.repositories.RoleRepo;
import com.setgreen.repositories.SchoolRepo;
import com.setgreen.repositories.UserRepo;
import com.setgreen.services.UserService;
import com.setgreen.services.mailservice.MailHandler;
import com.setgreen.util.Debugger;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepo userRepo;
	@Autowired
	RoleRepo rr;
	@Autowired
	SchoolRepo sr;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public ResponseBody<User> saveUser(SignUpForm suf){
		try {
			User ud = new User(suf);
			Set<Role> sor = ud.getRoles();
			//XXX DO NOT EVER REMOVE THIS CODE UNDER PAIN OF DEATH. IT PLEASES THE DARK GODS OF CREATION, ALLOWING THE SICK DANCE OF DATA MANIPULATION TO CONTINUE. FORSAKING THIS CODE IS PUNISHABLE BY BEING TOLD YOU ARE, AND I QUOTE "in for a rough time."
			try { //THAT INCLUDES THIS LINE
				for(Role r : sor) { //THIS LINE
					sor.remove(r); //THIS LINE
					if(r.getRole().hasDistrict()) { //THIS LINE
						r.setSchool(sr.findById(r.getSchool().getId()).get()); //THIS LINE
					}
					Debugger.cout(r.toString()+"\n");//not this one
					sor.add(r); //THIS LINE
				} //THIS LINE
				ud.setRoles(sor); //THIS LINE
			}//THIS LINE
			catch(NullPointerException e) { //THIS LINE
				
			} //THIS LINE
			//and that's it.
			MailHandler m = new MailHandler(new JavaMailSenderImpl());
			ud.setPassword(m.genLink());
			//XXX DEBUG
			String s = "User Saved";
			if(Debugger.MODE_ON) {
				s = m.debugMessage(m._inviteUser(ud));
			}
			else {
				m.inviteUser(ud);
			}
			//END DEBUG
			ud.setPassword(bCryptPasswordEncoder.encode(ud.getPassword()));
			userRepo.save(ud);
			return new ResponseBody<User>(HttpStatus.ACCEPTED.value(), s, ud);
		}
		catch(Exception e) {
			return new ResponseBody<User>(HttpStatus.BAD_REQUEST.value(), "Error creating user: " + e.getLocalizedMessage(), new User());
		}
	}


	/**
	 * Attempts to login a user
	 * @param l LoginRequest to service
	 * @return ResponseBody<User> A responsebody with the user, or null if invalid.
	 */
	public ResponseBody<User> loginAttempt(LoginRequest l){
		ResponseBody<User> rb = emailFetch(l.getUsername());
		try {
			if(rb.getHttpStatusCode() == HttpStatus.BAD_REQUEST.value())
				throw(new Exception("Username"));
			return new ResponseBody<User>(HttpStatus.ACCEPTED.value(), "Username good", rb.getResult());
		}
		catch(Exception e) {
			return new ResponseBody<User>(HttpStatus.BAD_REQUEST.value(), "Invalid username", rb.getResult());
		}
	}

	public ResponseBody<User> fetchByEmail(String s) {
		ResponseBody<User> rb = emailFetch(s);
		//rb.getResult().setPassword(null);
		return rb;
	}

	private ResponseBody<User> emailFetch(String s) {
		try {
			User u = userRepo.findByEmail(s);

			return new ResponseBody<User>(HttpStatus.ACCEPTED.value(), "Found user", u);
		}
		catch(Exception e) {
			return new ResponseBody<User>(HttpStatus.BAD_REQUEST.value(), "No user found", null);
		}
	}


	/** Updates a password for a user u
	 * @param u User object that you most likely created exclusively to update another already existing user object
	 */
	@Override
	public ResponseBody<User> updatePassword(User u, User u2) {
		ResponseBody<User> rb = new ResponseBody<User>(HttpStatus.ACCEPTED.value(), "Password Changed", u);
		try {
			if(u.getEmail().equals(u2.getEmail())) { 
				userRepo.updatePassword(u.getEmail(), bCryptPasswordEncoder.encode(u.getPassword()));
			}
			else {
				throw new Exception("Bad token");
			}
		}
		catch(Exception e) {
			rb.setHttpStatusCode(HttpStatus.NOT_ACCEPTABLE.value());
			rb.setMessage("Did not change password");
		}
		return rb;

	}


	@Transactional
	/** Updates the password for a user AND sets the user to be verified
	 * @param u User object, already possessing the new password.
	 */
	public ResponseBody<User> updatePassAndVerify(User u, User u2) {
		ResponseBody<User> rb = updatePassword(u, u2);
		if(rb.getHttpStatusCode()==HttpStatus.ACCEPTED.value()) {
			userRepo.updateVerify(u.getEmail(), true);
		}
		return rb;
	}

	public ResponseBody<User> deleteUser(User u){
		try {
			userRepo.deleteById(u.getId());
			return new ResponseBody<User>(HttpStatus.ACCEPTED.value(), "User Deleted", u);
		}
		catch(Exception e) {
			return new ResponseBody<User>(HttpStatus.BAD_REQUEST.value(), "Could not delete user: "+e, u);
		}
	}

	@Override //XXX TESTME
	public ResponseBody<User> updateProfile(User u) {
		try{
			if(u.getId().equals(userRepo.findByEmail(u.getEmail()).getId())) {
				userRepo.updateName(u.getFirstname(), u.getLastname(), u.getId());
				return new ResponseBody<User>(HttpStatus.ACCEPTED.value(), "profile updated", userRepo.findById(u.getId()).get());
			}
			throw new Exception("FailToMatchUser");
		}
		catch(Exception e) {
			return new ResponseBody<User>(HttpStatus.BAD_GATEWAY.value(), "Error updating profile: "+e, u);
		}
	}


	@Override
	@Transactional
	public ResponseBody<User> verifyUser(User u, boolean toSet) {
		try {
			userRepo.updateVerify(u.getId(), toSet);
			User anon = userRepo.findById(u.getId()).get();
			anon.setPassword("-");
			return new ResponseBody<User>(HttpStatus.ACCEPTED.value(), "verification updated", anon);
		}
		catch(Exception e) {
			return new ResponseBody<User>(HttpStatus.BAD_GATEWAY.value(), "Error updating profile: "+e, u);
		}
	}

	@Transactional
	@Override
	public void zeroTempPassword(String email) {
		userRepo.updateTmpPwd(userRepo.findByEmail(email).getId(),0);
	}
	
	@Transactional
	@Override
	public ResponseBody<User> resetForgotPassword(String pw){
		try {
			User u = userRepo.findByTmpPwd(pw.hashCode());
			userRepo.updateTmpPwd(u.getId(), 0);
			userRepo.updateVerify(u.getId(), false);
			return new ResponseBody<User>(HttpStatus.ACCEPTED.value(), "good", u);
		}
		catch(Exception e){
			Debugger.cout("resetForgotPassword triggered an error: " + e + "\n");
			return new ResponseBody<User>(HttpStatus.BAD_GATEWAY.value(), "Error in zeroTempPassword: "+e, null);
		}
	}
	
	@Transactional
	@Override
	public void forgotPassword(String email) {
		try {
    		User u = userRepo.findByEmail(email);
    		MailHandler mh = new MailHandler(new JavaMailSenderImpl());
    		String tempPw = mh.genLink(25);
			try {
				
				User v = userRepo.findByTmpPwd(tempPw.hashCode()); //see if someone has our tmpPwd
				while(v.getVerified() || !v.getVerified()) { //we crash if v doesn't exist.
					Debugger.cout(">>FORGOT PASSWORD LOOP\n");
					tempPw = mh.genLink(25);
					v = userRepo.findByTmpPwd(tempPw.hashCode());
				}
			}
			catch(Exception e){
				mh.forgotPassword(email, tempPw);
	    		userRepo.updateTmpPwd(u.getId(), tempPw.hashCode()); //when we crash (because user is not found) we email and update temp password
			}
    		
    	}
    	catch(Exception e) {
    		Debugger.cout("forgotPassword error: " + e + "\n");
    	}
	}
}
