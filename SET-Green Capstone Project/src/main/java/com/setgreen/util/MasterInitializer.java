package com.setgreen.util;

import java.io.FileReader;
import java.util.Properties;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

import com.setgreen.controller.ControllerAssistant;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.Role;
import com.setgreen.model.RoleName;
import com.setgreen.model.User;
import com.setgreen.repositories.UserRepo;

/**
 * @author Brendon LeBaron
 *	Holds startup methods.
 */
@Component
public class MasterInitializer implements CommandLineRunner{
	@Autowired
	ControllerAssistant hlp;
	@Autowired
    private UserRepo ur;
	
	@Override
	public void run(String... args) throws Exception {
		System.out.println(userInit());
		
	}
	
	/**
	 * Adds a single admin user into the system as described in a file in home directory known as "sysstart.config"
	 * @return
	 */
	public ResponseBody<Boolean> userInit(){
		try {
			Properties p = new Properties();
			p.load(new FileReader("sysstart.config"));
			User u = new User();
			u.setPassword(p.getProperty("password"));
			u.setEmail(p.getProperty("username"));
			u.setFirstname(p.getProperty("firstname", "first"));
			u.setLastname(p.getProperty("lastname", "default"));
			if(u.getEmail().equals("") || u.getPassword().equals("")) {
				throw new Exception("invalid config");
			}
			HashSet<Role> sor = new HashSet<Role>();
			Role r = new Role();
			r.setRole(RoleName.ADMIN);
			u.setRoles(sor);
			ur.save(u);
			return new ResponseBody<Boolean>(HttpStatus.ACCEPTED.value(), "", true);
		}
		catch(Exception e) {
			return new ResponseBody<Boolean>(HttpStatus.FORBIDDEN.value(), e.getMessage(), false);
		}
	}
	
	public ResponseBody<Boolean> coldStart(){
		try {
			return new ResponseBody<Boolean>(HttpStatus.ACCEPTED.value(), "", true);
		}
		catch(Exception e) {
			return new ResponseBody<Boolean>(HttpStatus.FORBIDDEN.value(), "", false);
		}
	}

	
}
