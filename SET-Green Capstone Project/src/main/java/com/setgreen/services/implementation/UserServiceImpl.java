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

	@Override//FIXME URGENT creating users needs school and that needs district, on top of roles. Not inserted right atm.
	public ResponseBody<User> saveUser(SignUpForm suf){
		try {
			User ud = new User(suf);
			Set<Role> sor = ud.getRoles();
			for(Role r : sor) {
				sor.remove(r);
				r.setSchool(sr.findById(r.getSchool().getId()).get());
				Debugger.cout(r.toString()+"\n");
				sor.add(r);
			}
			ud.setRoles(sor);
			MailHandler m = new MailHandler(new JavaMailSenderImpl());
			ud.setPassword(m.genLink());
			//XXX DEBUG
			String s = "User Saved";
			if(Debugger.MODE_ON) {
				s = m.debugMessage(m.inviteUser(ud));
			}
			else {
				m.sendMailMessage(m.inviteUser(ud));
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
		rb.getResult().setPassword(null);
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


	@Override
	public ResponseBody<User> updateProfile(User u) {
		// TODO Auto-generated method stub
		return null;
	}

}
