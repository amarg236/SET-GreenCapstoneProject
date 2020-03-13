package com.setgreen.services.usergroups;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.model.RoleName;

/**
 * @author Brendon LeBaron
 * This class handles building instances of Users & their permission levels.
 * It does this via a cache of all the different roles associated with all the classes that extend UserReference
 *
 */
@Service
public class RoleManager {
	@Autowired
	private List<UserReference> usergroups; //This is all classes associated with UserReference
	private static final Map<String, UserReference> UGCache = new HashMap<>(); //This will be a hashmap with said classes for quick searches.
	
	/**
	 * Spring runs this automagically and it fills the hashmap with classes keyed by role name
	 */
	@PostConstruct
	public void buildCache() {
		for(UserReference ur : usergroups) {
			UGCache.put(ur.getName().toString(), ur);
		}
	}
	
	/**Creates a class object representing this access level (we assume would be) implementing UserReference
	 * @param rn RoleName for the given user
	 * @return A class instance for the user's given permission level
	 */
	public UserReference build(RoleName rn) {
		try {
			rn.getClass();
		}
		catch(Exception e) {
			return UGCache.get(RoleName.UNFOUND.toString());
		}
		return UGCache.get(rn.toString());
	}
}
