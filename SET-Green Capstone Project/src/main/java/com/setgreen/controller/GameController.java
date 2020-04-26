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
import com.setgreen.model.School;
import com.setgreen.model.Teams;
import com.setgreen.services.implementation.GameHandler;
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
	
	@PostMapping("delete")
	public ResponseBody<Long> delete(@RequestBody DataObject<Long> id, Authentication auth) {
		return hlp.getRoleByTeam(auth, gh.getGameById(id.getData())).deleteGame(id);
	}
	@PostMapping("modify")
	public ResponseBody<Game> modify(@RequestBody Game g, Authentication auth) {
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId())).rescheduleGame(auth, g);
	}
	
	@PostMapping("reject")
	public ResponseBody<Game> reject(@RequestBody Game g, Authentication auth){
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId())).rejectGame(auth, g);
	}
	
	@PostMapping("reject/clear")
	public ResponseBody<Game> clearReject(@RequestBody Game g, Authentication auth){
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId())).validateRejection(auth, g);
	}
	
	@PostMapping("accept")
	public ResponseBody<Long> accept(@RequestBody Game g, Authentication auth) {//NOTE this MUST use getGameById as we're actively changing the game's parameters.
		return hlp.getRoleByTeam(auth, gh.getGameById(g.getId())).approveGame(auth, g.getId());
	}
	
	@PostMapping("accept/bulk") //{"data":[1,2,3,4,5,6,7,132,5574,99]}
	public ResponseBody<Long>[] acceptBulk(@RequestBody DataObject<Long[]> dta, Authentication auth){
		ResponseBody<Long>[] rb;
		
		rb = new ResponseBody[dta.getData().length];
		for(int i = 0; i < rb.length; i++) {
			Game g = new Game();
			g.setId(dta.getData()[i]);
			rb[i] = accept(g, auth);
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
	
	// ==================== get/BySchool/* ==================== //
	// Requires school ID	                                    //
	// ========================================================//
	@PostMapping("get/BySchool/all") //all games for all teams for a school
	public ResponseBody<List<Game>> getSchoolIdAll(@RequestBody School s){
		return gh.getGames(s, true);
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
