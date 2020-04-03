package com.setgreen.controller;

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
	/** gets the role for a given location
	 * @param auth
	 * @param d
	 * @return
	 */
	protected UserReference getRoleByLocation(Authentication auth, District d) {
		return rn.build(findRoleByLocation(auth, d));
	}
//	protected UserReference getRoleByTeam(Authentication auth, String team) {
//		return rn.build(findRoleByTeam(auth, team));
//	}
	protected UserReference getRoleByTeam(Authentication auth, Teams t) {
		return rn.build(findRoleByTeam(auth, t));
	}
	protected UserReference getRoleByTeam(Authentication auth, Game g) {
		Teams t = new Teams();
		t.setId(g.getHometeamId());
		t.setTmName(g.getHometeam());
		try {
			t = ts.getTeamsById(t).getResult();
		}
		catch(Exception e) {
			t = ts.getTeamsByName(t.getTmName()).getResult();
		}
		return getRoleByTeam(auth, t);
	}
	/** gets the best role the user has
	 * @param auth
	 * @return
	 */
	private RoleName findRoleByBest(Authentication auth) {
		RoleName rtrn = RoleName.UNFOUND;
		for(Object o : auth.getAuthorities().toArray()) {//us.fetchByEmail(auth.getName()).getResult().getRoles()) {
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
	/** gets the best role in the given district
	 * @param auth
	 * @param d
	 * @return
	 */
	private RoleName findRoleByLocation(Authentication auth, District d) {
		//FIXME this fucks up transactional bullshit
		//		RoleName rtrn = RoleName.UNFOUND;
		//		for(Role x : us.fetchByEmail(auth.getName()).getResult().getRoles()) {
		//			if(x.getRole().hasDistrict()) {
		//				if(d.equals(x.getSchool().getDistrict()) && rtrn.userLevel() < x.getRole().userLevel()) {
		//					rtrn = x.getRole();
		//				}
		//			}
		//			else if(rtrn.userLevel() < x.getRole().userLevel()) {
		//				rtrn = x.getRole();
		//			}
		//		}
		//		return rtrn;
		return findRoleByBest(auth);
	}

}
