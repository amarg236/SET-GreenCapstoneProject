package com.setgreen.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.setgreen.model.District;
import com.setgreen.model.Game;
import com.setgreen.model.Role;
import com.setgreen.model.RoleName;
import com.setgreen.model.Teams;
import com.setgreen.services.TeamsService;
import com.setgreen.services.UserService;
import com.setgreen.services.usergroups.RoleManager;
import com.setgreen.services.usergroups.UserReference;
import com.setgreen.util.Debugger;
@Component
public class ControllerAssistant {
	//Note on auth: getName() will give the email they send us, principal the UserPrincipal, authorities the roles they have as an array
	@Autowired
	RoleManager rn;
	@Autowired
	UserService us;
	@Autowired
	TeamsService ts;
	/**gets the best role the user has
	 * @param auth
	 * @return
	 */
	protected UserReference getRoleByBest(Authentication auth){
		return rn.build(findRoleByBest(auth));

	}
	protected UserReference getRoleByTeam(Authentication auth, Teams t) {
		return rn.build(findRoleByTeam(auth, t));
	}
	/**
	 * @param auth authentication
	 * @param g game we're referencing to get hometeam for
	 * @return role of user in the team
	 */
	protected UserReference getRoleByTeam(Authentication auth, Game g) {
		System.out.print(">> did we start\n");
		try {
			Set<Role> r = us.fetchByEmail(auth.getName()).getResult().getRoles();
			System.out.print(">> roles: " + r.toString() + "\n");
			RoleName rtrn = RoleName.UNFOUND;
			for(Role x : r) {
				if(x.getRole().hasDistrict() && x.getRole().userLevel() > rtrn.userLevel()) {
					System.out.print(">>hasdistrict\n");					
//					for(Teams t : tms) {
//						System.out.print(t.toString()+"\n");
					Teams t = new Teams();
					Teams t2 = new Teams();
					t.setId(g.getHometeamId());
					t.setId(g.getAwayteamId());//TODO Cleanup debug
					if((x.getSchool().getId() == ts.getTeamsById(t).getResult().getSchool().getId() || x.getSchool().getId() == ts.getTeamsById(t2).getResult().getSchool().getId()) && x.getRole().userLevel() > rtrn.userLevel()) {
						System.out.print(">>condition success\n");
						rtrn = x.getRole();
					}
//					}
				}
				else if(x.getRole().userLevel() > rtrn.userLevel()) {
					System.out.print(">>elseif\n");
					rtrn = x.getRole();
				}
			}
			System.out.print(">>returning " + rtrn.toString() +"\n");
			return rn.build(rtrn);
		}
		catch(Exception e) {
			return getRoleByBest(auth);
		}
	}
	/** gets the best role the user has
	 * @param auth
	 * @return
	 */
	private RoleName findRoleByBest(Authentication auth) {
		RoleName rtrn = RoleName.UNFOUND;
		for(Object o : auth.getAuthorities().toArray()) {
			try {
				String x = o.toString();
				if(rtrn.userLevel() < RoleName.valueOf(x).userLevel()) {
					rtrn = RoleName.valueOf(x);
				}
			}
			catch(Exception e) {//We should never actually be able to throw an exception here, but we're going to stop if we do.
				return rtrn;
			}
		}
		return rtrn;
	}
	@Transactional
	private RoleName findRoleByTeam(Authentication auth, Teams t) {
		RoleName rtrn = RoleName.UNFOUND;
		Iterable<Role> rls = us.fetchByEmail(auth.getName()).getResult().getRoles();
		for(Role x : rls) {
			try {//XXX IMPROVE this could be more efficient, especially if the given team doesn't exist.
				if(x.getRole().hasDistrict()) {
					if(t.getSchool().getDistrict().equals(x.getSchool().getDistrict()) && x.getRole().userLevel() > rtrn.userLevel()) {
						rtrn = x.getRole();
					}
				}
				else {
					if(x.getRole().userLevel()>rtrn.userLevel()) {
						rtrn = x.getRole();
					}
				}
			}
			catch(Exception e) {
				rtrn = findRoleByBest(auth);
			}
		}
		return rtrn;
		//return findRoleByBest(auth);//rtrn;
	}
//	private RoleName findRoleByTeam(Authentication auth, String awayteam) {
//		return findRoleByTeam(auth, ts.getTeamsByName(awayteam).getResult());	
//	}

}
