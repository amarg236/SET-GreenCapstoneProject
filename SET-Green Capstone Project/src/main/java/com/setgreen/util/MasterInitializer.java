package com.setgreen.util;

import java.io.File;
import java.io.FileReader;
import java.util.Properties;
import java.util.Scanner;
import java.util.Arrays;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

import com.setgreen.controller.ControllerAssistant;
import com.setgreen.model.District;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.Role;
import com.setgreen.model.RoleName;
import com.setgreen.model.School;
import com.setgreen.model.Teams;
import com.setgreen.model.User;
import com.setgreen.repositories.DistrictRepo;
import com.setgreen.repositories.SchoolRepo;
import com.setgreen.repositories.TeamsRepo;
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
	@Autowired
	private DistrictRepo dr;
	@Autowired
	private SchoolRepo sr;
	@Autowired
	private TeamsRepo tr;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Override
	public void run(String... args) throws Exception {
		try {
			Properties p = new Properties();
			p.load(new FileReader("sysstart.config"));
			System.out.println(userInit(p));
			System.out.println(teamsInit(p));
		
		}
		catch(Exception e) {
			
		}
		
	}
	
	/**
	 * Adds a single admin user into the system as described in a file in home directory known as "sysstart.config"
	 * @return
	 */
	public ResponseBody<Boolean> userInit(Properties p){
		try {
			User u = new User();
			u.setPassword(bCryptPasswordEncoder.encode(p.getProperty("password")));
			u.setEmail(p.getProperty("username"));
			u.setFirstname(p.getProperty("firstname", "first"));
			u.setLastname(p.getProperty("lastname", "default"));
			u.setVerified(true);
			if(u.getEmail().equals("") || u.getPassword().equals("")) {
				throw new Exception("invalid config");
			}
			HashSet<Role> sor = new HashSet<Role>();
			Role r = new Role();
			r.setRole(RoleName.ADMIN);
			sor.add(r);
			u.setRoles(sor);
			ur.save(u);
			return new ResponseBody<Boolean>(HttpStatus.ACCEPTED.value(), "userInit", true);
		}
		catch(Exception e) {
			return new ResponseBody<Boolean>(HttpStatus.FORBIDDEN.value(), e.getMessage(), false);
		}
	}
	
	//csvs must be schoolname, teamname, arbitername, teamclass, teamgender
	public ResponseBody<Boolean> teamsInit(Properties p){
		try {
			HashSet<String> files = new HashSet<String>(Arrays.asList(p.getProperty("teams").split(",")));
			int s = 0, f = 0;
			for(String fileName : files) {
				District dstrct;
				try{
					dstrct=dr.findByName(fileName.split(".csv")[0].trim());
					if(dstrct.getId() == null) {
						throw new Exception("not found");
					}
				}
				catch(Exception e) {
					dstrct = new District();
					dstrct.setDistrictName(fileName.split(".csv")[0].trim());
					dstrct = dr.save(dstrct);
				}
				Scanner scnr = new Scanner(new File(p.getProperty("tpath", "")+fileName.trim()));
				while(scnr.hasNextLine()) {
					try {
							String[] dta = scnr.nextLine().split(",");
							
							School schl = new School();
							schl.setName(dta[0].trim());
							schl.setDistrict(dstrct);
							Teams tms = new Teams();
							tms.setTmName(dta[1].trim());
							tms.setInternalName(dta[2].trim());
							tms.setTmClass(dta[3].trim());
							tms.setTeamGender(dta[4].trim());
							tr.save(tms);
					}
					catch(Exception e) {
						f++;
					}
				}
				s++;
				scnr.close();
			}
			return new ResponseBody<Boolean>(HttpStatus.ACCEPTED.value(), "teamsInit Successes:" + s + " Failed: " + f, true);
		}
		catch(Exception e) {
			return new ResponseBody<Boolean>(HttpStatus.FORBIDDEN.value(), e.getMessage(), false);
		}
	}

	
}
