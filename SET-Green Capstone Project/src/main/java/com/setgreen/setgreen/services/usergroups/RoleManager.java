package com.setgreen.setgreen.services.usergroups;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.RoleName;

@Service
public class RoleManager {
	@Autowired
	private List<UserReference> usergroups;
	private static final Map<String, UserReference> UGCache = new HashMap<>();
	@PostConstruct
	public void buildCache() {
		for(UserReference ur : usergroups) {
			UGCache.put(ur.getName().toString(), ur);
		}
	}
	//Creates a class object representing this access level (we assume would be) implementing UserReference
	public UserReference build(RoleName rn) {
		System.out.println(">>"+usergroups.toString());
		return UGCache.get(rn.toString());
	}
}
