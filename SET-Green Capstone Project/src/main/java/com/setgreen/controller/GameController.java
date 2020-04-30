package com.setgreen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.model.District;
import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.RoleName;
import com.setgreen.model.School;
import com.setgreen.model.Teams;
import com.setgreen.services.implementation.GameHandler;
import com.setgreen.services.usergroups.UserReference;
import com.setgreen.util.DataObject;

@RestController
@CrossOrigin
@RequestMapping("api/game")
public class GameController {
	@Autowired
	GameHandler gh = new GameHandler();
	
	@Autowired
	ControllerAssistant hlp;
	
	@PostMapping("save")
	public ResponseBody<Game> save(@RequestBody Game g, Authentication auth){
		return hlp.getRoleByTeam(auth, g).createGame(auth, g);
	}
	
	@PostMapping("delete")//{"id"=123}
	public ResponseBody<Long> delete(@RequestBody DataObject<Long> id, Authentication auth) {
		return hlp.getRoleByTeam(auth, gh.getGameById(id.getData())).deleteGame(id);
	}
	@PostMapping("modify")//{"id"=123}
	public ResponseBody<Game> modify(@RequestBody Game g, Authentication auth) {
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId())).rescheduleGame(auth, g);
	}
	
	@PostMapping("modify/clear")//{"id"=123}
	public ResponseBody<Game> clearModify(@RequestBody Game g, Authentication auth){
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId())).validateModify(auth, g);
	}
	
	@PostMapping("reject")//{"id"=123}
	public ResponseBody<Game> reject(@RequestBody Game g, Authentication auth){
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId())).rejectGame(auth, g);
	}
	
	@PostMapping("reject/clear")//{"id"=123}
	public ResponseBody<Game> clearReject(@RequestBody Game g, Authentication auth){
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId())).validateRejection(auth, g);
	}
	
	@PostMapping("accept")//{"id"=123}
	public ResponseBody<Long> accept(@RequestBody Game g, Authentication auth) {//NOTE this MUST use getGameById as we're actively changing the game's parameters.
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId())).approveGame(auth, g.getId());
	}
	
	@PostMapping("accept/bulk") //{"data":[1,2,3,4,5,6,7,132,5574,99]}
	public ResponseBody<Long>[] acceptBulk(@RequestBody DataObject<Long[]> dta, Authentication auth){
		ResponseBody<Long>[] rb;
		UserReference _ur = hlp.getRoleByBest(auth);
		rb = new ResponseBody[dta.getData().length];
		for(int i = 0; i < rb.length; i++) {
			Game g = new Game();
			g.setId(dta.getData()[i]);
			//Minor save on processing if it's not a coach doing the bulk accept as we don't have to fetch role
			if(_ur.getName().userLevel() >= RoleName.ASSIGNOR.userLevel()) {
				rb[i] = _ur.approveGame(auth, g.getId());
			}
			else {
				rb[i] = accept(g, auth);
			}
		}
		return rb;
	}
	
	@PostMapping("deny/bulk") //{"data":[1,2,3,4,5,6,7,132,5574,99]}
	public ResponseBody<Game>[] denyBulk(@RequestBody DataObject<Long[]> dta, Authentication auth){
		ResponseBody<Game>[] rb;
		UserReference _ur = hlp.getRoleByBest(auth);
		rb = new ResponseBody[dta.getData().length];
		for(int i = 0; i < rb.length; i++) {
			Game g = new Game();
			g.setId(dta.getData()[i]);
			//Minor save on processing if it's not a coach doing the bulk accept as we don't have to fetch role
			if(_ur.getName().userLevel() >= RoleName.ASSIGNOR.userLevel()) {
				rb[i] = _ur.rejectGame(auth, g);
			}
			else {
				rb[i] = reject(g, auth);
			}
		}
		return rb;
	}
	/** Gets all the verified games in a district
	 * @param district String name of district for games
	 * @return ResponseBody status of request
	 */
	@PostMapping("get/district")
	public ResponseBody<List<Game>> getDistrict(@RequestBody District d) {
		return gh.getGames(d, false);
	}
	
	@PostMapping("get/district/all")
	public ResponseBody<List<Game>> getDistrictAll(@RequestBody District d) {
		return gh.getGames(d, true);
	}
	
	/*
	 * get by game template
	 * game must have:
	 * 	hometeamId
	 * 	accepted
	 * 	approved
	 * Optional:
	 * 	awayteamId
	 */
	@PostMapping("get/ByGame/matched")
	public ResponseBody<List<Game>> getSchoolIdMatched(@RequestBody Game g){
		return gh.getGamesId(g);
	}
	
	// ==================== get/ByTeamId/* ==================== //
	// Team requires: teamname                                  //
	// ======================================================== //
	@PostMapping("get/ByTeam")
	public ResponseBody<List<Game>> getSchool(@RequestBody Teams s) {
		return gh.getGamesByTeamname(s, false);
	}
	
	@PostMapping("get/ByTeam/all")
	public ResponseBody<List<Game>> getSchoolAll(@RequestBody Teams s) {
		return gh.getGamesByTeamname(s, true);
	}
	
	// ==================== get/ByTeamId/* ==================== //
	// Team requires: id                                        //
	// ======================================================== //
	@PostMapping("get/ByTeamId/all")
	public ResponseBody<List<Game>> getSchoolId(@RequestBody Teams s) {
		return gh.getGamesId(s, false, false);
	}
	@PostMapping("get/ByTeamId/hasNotification") //{"hometeamId":long, "homeNodification":bool, "awayNotification": bool}
	public ResponseBody<List<Game>> getTeamIdNotifications(@RequestBody Game g){
		return gh.getGamesIdNotification(g);
	}
	@PostMapping("get/ByTeamId")
	public ResponseBody<List<Game>> getSchoolIdAll(@RequestBody Teams s) {
		return gh.getGamesId(s, true, false);
	}
	@PostMapping("get/ByTeamId/rejected")
	public ResponseBody<List<Game>> getSchoolIdRejected(@RequestBody Teams s) { //All games that are rejected for this team
		return gh.getGamesId(s, true, false);
	}
	@PostMapping("get/ByTeamId/home") //Home games that are awayAccepted
	public ResponseBody<List<Game>> getTeamIdHome(@RequestBody Teams t){
		return gh.getHomeGames(t);
	}
	@PostMapping("get/ByTeamId/away") //Away games that are awayAccepted
	public ResponseBody<List<Game>> getTeamIdAway(@RequestBody Teams t){
		return gh.getAwayGames(t);
	}
	@PostMapping("get/ByTeamId/modified") //games that are modified by hometeam
	public ResponseBody<List<Game>> getTeamIdModified(@RequestBody Teams t){
		return gh.getGamesIdModified(t);
	}
	@PostMapping("get/ByTeamId/home/notAccepted") //Home games that are NOT awayAccepted
	public ResponseBody<List<Game>> getTeamIdHomeUnverified(@RequestBody Teams t){
		return gh.getHomeGamesNoV(t);
	}
	@PostMapping("get/ByTeamId/away/notAccepted") //Away games that are NOT awayAccepted
	public ResponseBody<List<Game>> getTeamIdAwayUnverified(@RequestBody Teams t){
		return gh.getAwayGamesNoV(t);
	}
	@PostMapping("get/ByTeamId/home/notApproved") //Away games that are NOT approved
	public ResponseBody<List<Game>> getTeamIdHomeAdminUnverified(@RequestBody Teams t){
		return gh.getHomeGamesNoAdminV(t);
	}
	@PostMapping("get/ByTeamId/away/notApproved") //Away games that are NOT approved
	public ResponseBody<List<Game>> getTeamIdAwayAdminUnverified(@RequestBody Teams t){
		return gh.getAwayGamesNoAdminV(t);
	}
	
	// ==================== get/all/* ==================== //
	// Requires nothing	                                   //
	// =================================================== //
	@PostMapping("get/all")
	public ResponseBody<List<Game>> getAll() {
		return gh.allGames();
	}
	@PostMapping("get/all/notApproved")
	public ResponseBody<List<Game>> getAllNotApproved(){
		return gh.allGameNoV();
	}
	@PostMapping("get/all/arbiter")
	public ResponseBody<DataObject<String>> getArbiterFormatted(){
		return gh.getArbiterFormatted();
	}
	
	// ==================== get/BySchool/* ==================== //
	// Requires school ID	                                    //
	// ========================================================//
	@PostMapping("get/BySchool/all") //all games for all teams for a school
	public ResponseBody<List<Game>> getSchoolIdAll(@RequestBody School s){
		return gh.getGames(s, true);
	}
	@PostMapping("get/BySchoolId/hasNotification") //{"hometeamId":long, "homeNodification":bool, "awayNotification": bool}
	public ResponseBody<List<Game>> getTeamIdNotifications(@RequestBody School s){
		return gh.getGamesSchoolIdNotification(s);
	}
	@PostMapping("get/BySchool/notAccepted") //all games where awayAccepted=false for all teams for a school
	public ResponseBody<List<Game>> getSchoolIdUserUnverified(@RequestBody School s){
		return gh.unverifiedGames(s);
	}
	@PostMapping("get/BySchool/notApproved") //all games where approved=false for all teams for a school
	public ResponseBody<List<Game>> getSchoolIdAdminUnverified(@RequestBody School s){
		return gh.getHomeGamesNoAdminV(s);
	}
}
