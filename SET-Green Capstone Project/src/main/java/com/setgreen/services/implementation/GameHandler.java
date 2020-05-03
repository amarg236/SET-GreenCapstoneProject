package com.setgreen.services.implementation;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.setgreen.model.District;
import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.School;
import com.setgreen.model.Teams;
import com.setgreen.repositories.GameRepo;
import com.setgreen.repositories.TeamsRepo;
import com.setgreen.util.DataObject;

@Service
public class GameHandler {
	@Autowired
	private GameRepo gr;
	@Autowired
	private TeamsRepo tr;
	/**Attempts to save a game
	 * @param g Game to save
	 * @return ResponseBody result of attempting to save game
	 */
	public ResponseBody<Game> saveGame(Game g){
		try{
			gr.save(g);
			
			return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), "Game Saved", g);
		}
		catch(Exception e) {
			return new ResponseBody<Game>(HttpStatus.NOT_ACCEPTABLE.value(), "Did not save game "+e, g);
		}
	}
	@Transactional
	public ResponseBody<Long> deleteGame(Long g) {
		try {
			gr.deleteById(g.longValue());
			return new ResponseBody<Long>(HttpStatus.ACCEPTED.value(), "Game Deleted", g);
		}
		catch(Exception e) {
			return new ResponseBody<Long>(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Delete Game", g);
		}
	}
	
	@Transactional
	public ResponseBody<Game> modifyGame(Game g) {
		try {
			g = gr.save(g);
			return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), "Game modified", g);
		}
		catch(Exception e) {
			return new ResponseBody<Game>(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not modify Game", g);
		}
	}
	@Transactional
	public ResponseBody<Long> teamVerifyGame(Authentication auth, Long g) {
		try{
			gr.updateAwayteamNotification(g, false);
			//gr.updateHometeamNotification(g, true);
			gr.updateUAcceptor(g, auth.getName());
			gr.updateAccept(g, true);
			return new ResponseBody<Long>(HttpStatus.ACCEPTED.value(), "Game Accepted", g);
		}
		catch(Exception e) {
			return new ResponseBody<Long>(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Accept Game", g);
		}
	}
	@Transactional
	public ResponseBody<Game> rejectGame(Authentication auth, Game g, boolean isAdminApprover){
		try {
			
			if(isAdminApprover) {
				gr.updateVerify(g.getId(), false);
				gr.updateUApprover(g.getId(), auth.getName());
				gr.updateRejected(g.getId(), true);
			}
			else {
				gr.updateAccept(g.getId(), false);
				gr.updateUAcceptor(g.getId(), auth.getName());
				gr.updateRejected(g.getId(), false);
			}
			
			return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), "Game Rejected", g);
		}
		catch(Exception e) {
			return new ResponseBody<Game>(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Reject Game: " + e, g);
		}
	}
	/**
	 * @param g ID of a game to verify
	 * @return Response body detailing the status of the verification
	 */
	@Transactional
	public ResponseBody<Long> adminVerifyGame(Authentication auth, Long g) {
		try {
			if(!gr.findById(g).get().isAwayAccepted()) {
				gr.updateUAcceptor(g, auth.getName());
				gr.updateAccept(g.longValue(), true);
			}
			gr.updateUApprover(g, auth.getName());
			gr.updateVerify(g, true);
			return new ResponseBody<Long>(HttpStatus.ACCEPTED.value(), "Game Verified", g);
		}
		catch(Exception e) {
			return new ResponseBody<Long>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not verify game " + e, g);
		}
	}

	public ResponseBody<List<Game>> getGamesUserVerified(District d) {
		try{
			List<Game> g;
			g = gr.findInDistrictAccepted(d.getDistrictName());
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games", null);
		}
	}
	/**
	 * Gets all games with home or awayteam id
	 * @param gm
	 * @return
	 */
	public ResponseBody<List<Game>> getGamesByAllTeamIds(Game gm){
		try{
			try {
				if(gm.getAwayteamId() < 0) {throw new Exception("AwayteamOutOfBounds");} //See if we have an awayteamid
			}
			catch(Exception e) {
				gm.setAwayteamId(gm.getHometeamId()); //if we don't use hometeam id instead, if that's missing we crash
			}
			List<Game> g;
			System.out.println(gm);
			g = gr.getByTeamIds(gm.getHometeamId(), gm.getAwayteamId());
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games "+e, null);
		}
	}
	public ResponseBody<List<Game>> getGamesByTeamname(Teams s, boolean findAll) {
		try{
			List<Game> g;
			if(findAll) {
				g = gr.findByTeamAll(s.getTmName());
			}
			else {
				g = gr.findByTeamVerified(s.getTmName());
			}
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games "+e, null);
		}
	}
	
	public ResponseBody<List<Game>> getGamesId(Game gm) {
		try{
			try {
				if(gm.getAwayteamId() < 0) {throw new Exception("AwayteamOutOfBounds");} //See if we have an awayteamid
			}
			catch(Exception e) {
				gm.setAwayteamId(gm.getHometeamId()); //if we don't use hometeam id instead, if that's missing we crash
			}
			List<Game> g;
			System.out.println(gm);
			g = gr.getByGameExample(gm.getHometeamId(), gm.getAwayteamId(), gm.isApproved(), gm.isRejected());
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games "+e, null);
		}
	}
	
	public ResponseBody<List<Game>> getGamesId(Teams s, boolean approved, boolean rejected) {
		Game g = new Game();
		g.setHometeamId(s.getId());
		g.setApproved(approved);
		g.setRejected(rejected);
		return getGamesId(g);
	}
	
	public ResponseBody<List<Game>> getGamesRejected(Teams s){
		try {
			List<Game> g;
			g = gr.findByHometeamIdOrAwayteamIdAndRejected(s.getId(), s.getId(), true);
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games "+e, null);
		}
	}
	
	public ResponseBody<List<Game>> getGames(District d, boolean findAll){
		try {
			List<Game> g;
			
				if(findAll) {
					g = gr.findInDistrictAll(d.getDistrictName());
				}
				else {
					g = gr.findInDistrictVerified(d.getDistrictName());
				}
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games", null);
		}
	}
	
	public ResponseBody<List<Game>> allGames() {
		LinkedList<Game> ll = new LinkedList<Game>();
		Iterable<Game> i = gr.findAll();
		i.forEach(ll::add);
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", ll);
	}
	public ResponseBody<List<Game>> allVerifiedGames(){
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findAllVerifiedAndRejectedFalse());
	}

	public Game getGameById(DataObject<Long> id) {
		return gr.findById(id.getData()).get();
	}

	public ResponseBody<List<Game>> JsonGetAll(){
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findAllByAwayAcceptedTrueAndRejectedFalse());
	}

	public Game getGameById(Long id) {
		return getGameById(new DataObject<Long>(id));
	}
	
	
	public ResponseBody<Game> validateRejection(Game g, boolean hometeamViewing) {
		if(hometeamViewing) {
			if(!g.isAwayNotification()) {
				gr.deleteById(g.getId());
				return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), "Game deleted", g);
			}
			else {
				gr.updateHometeamNotification(g.getId(), false);
				return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), "Hometeam Notification handled", g);
			}
		}
		else {
			if(!g.isHomeNotification()) {
				gr.deleteById(g.getId());
				return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), "Game deleted", g);
			}
			else {
				gr.updateAwayteamNotification(g.getId(), false);
				return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), "Awayteam Notification handled", g);
			}
		}
	}
	public ResponseBody<List<Game>> getHomeGames(Teams t) {
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findByHometeamIdAndAwayAcceptedTrue(t.getId()));
	}
	public ResponseBody<List<Game>> getAwayGames(Teams t) {
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findByAwayteamIdAndAwayAcceptedTrue(t.getId()));
	}
	public ResponseBody<List<Game>> getHomeGamesNoV(Teams t) {
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findByHometeamIdAndAwayAcceptedFalse(t.getId()));
	}
	public ResponseBody<List<Game>> getAwayGamesNoV(Teams t) {
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findByAwayteamIdAndAwayAcceptedFalse(t.getId()));
	}
	public ResponseBody<List<Game>> getHomeGamesNoAdminV(Teams t) {
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findByHometeamIdAndApprovedFalse(t.getId()));
	}
	public ResponseBody<List<Game>> getAwayGamesNoAdminV(Teams t) {
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findByAwayteamIdAndApprovedFalse(t.getId()));
	}
	public ResponseBody<List<Game>> allGameNoV() {
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findByApprovedFalse());
	}
	public ResponseBody<List<Game>> getGames(School s, boolean findAll) {
		try{
			List<Game> g = new ArrayList<Game>();
			Iterable<Teams> t = tr.findBySchool_Id(s.getId());
			for(Teams _t : t) {
				g.addAll(gr.findByTeamIdAll(_t.getId()));
			}
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games "+e, null);
		}
	}
	public ResponseBody<List<Game>> getHomeGamesNoAdminV(School s) {
		try{
			List<Game> g = new ArrayList<Game>();
			Iterable<Teams> t = tr.findBySchool_Id(s.getId());
			for(Teams _t : t) {
				g.addAll(gr.findTeamIdAndApproved(_t.getId(), false));
			}
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games "+e, null);
		}
	}
	public ResponseBody<List<Game>> unverifiedGames(School s) {
		try{
			List<Game> g = new ArrayList<Game>();
			Iterable<Teams> t = tr.findBySchool_Id(s.getId());
			for(Teams _t : t) {
				g.addAll(gr.findByTeamIdAndVerified(_t.getId(), false));
			}
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games "+e, null);
		}
	}
	@Transactional
	public ResponseBody<Game> validateModify(Game gm) {
		try{
			Game g = gr.findById(gm.getId()).get();
			g.setHasBeenEdited(false);
			g.setHomeNotification(false);
			return new ResponseBody<Game> (HttpStatus.ACCEPTED.value(), "", g);
		}
		catch(Exception e) {
			return new ResponseBody<Game>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find game "+e, gm);
		}
	}
	public ResponseBody<List<Game>> getGamesIdModified(Teams t) {
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findByHometeamIdAndHasBeenEditedTrue(t.getId()));
	}
	@Transactional
	public ResponseBody<List<Game>> getGamesIdNotification(Game g) {
		List<Game> gon_give_it_to_yah = gr.findByTeamIdAndNotifications(g.getHometeamId(), g.isHomeNotification(), g.isAwayNotification());
		for(Game x : gon_give_it_to_yah) {
			if(x.getHometeamId() == g.getHometeamId()) {
				g.setHomeNotification(false);
			}
			else {
				g.setAwayNotification(false);
			}
			gr.save(g);
		}
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gon_give_it_to_yah);
	}
	public ResponseBody<DataObject<String>> getArbiterFormatted(){
		Game g = new Game();
		Date d = new Date();
		d.setTime(0);
		g.setTime(d);
		return getArbiterFormatted(g);
	}
	public ResponseBody<DataObject<String>> getArbiterFormatted(Game g) {
		List<Game> gms = gr.findByAfterDateAndApprovedTrueAndAwayAcceptedTrue(g.getTime());
		StringBuilder rtrn = new StringBuilder();
		rtrn.append("Date,Time,Game,Custom-Game-ID,Sport,Level,Home-Team,Home-Level,Away-Team,Away-Level,Site,Sub-site,Bill-To,Officials");
		SimpleDateFormat sdf = new SimpleDateFormat("MM'/'dd'/'YY','hh:mm aa");
		String sport = "Soccer";
		HashMap<Long, Teams> sot = new HashMap<Long, Teams>();
		for(Game _g : gms) {
			Teams t, t2;
			if(!sot.containsKey(_g.getHometeamId())) {
				t = tr.findById(_g.getHometeamId()).get();
				sot.put(_g.getHometeamId(), t);
			}
			else {
				t = sot.get(_g.getHometeamId());
			}
			if(!sot.containsKey(_g.getAwayteamId())) {
				t2 = tr.findById(_g.getAwayteamId()).get();
				sot.put(_g.getAwayteamId(), t2);
			}
			else {
				t2 = sot.get(_g.getAwayteamId());
			}
			String EL = ",";
			rtrn.append(
					sdf.format(	
							_g.getTime()) + EL // DATE_AND_TIME 
							+ EL			// GAME 
							+ EL			//Custom game ID
							+ sport + EL		//Sport
							+ t.getTmClass() + EL//Level
							+ t.getInternalName() + EL//Home-Team
							+ t.getTmClass() + EL//Home-level
							+ t2.getInternalName() + EL//Away-Team
							+ t2.getTmClass() + EL//Away-level
							+ EL//Site
							+ EL//Sub-site
							+ EL//Bill-To
							+ EL//Officials
							+ "\n"
					);
			sport = "";
		}
		if(sot.isEmpty()) {
			String EL = ",";
			rtrn.append(
						  EL // DATE_AND_TIME 
						+ EL			// GAME 
						+ EL			//Custom game ID
						+ EL		//Sport
						+ EL//Level
						+ EL//Home-Team
						+ EL//Home-level
						+ EL//Away-Team
						+ EL//Away-level
						+ EL//Site
						+ EL//Sub-site
						+ EL//Bill-To
						+ EL//Officials
						+ "\n"
					);
		}
		return new ResponseBody<DataObject<String>>(HttpStatus.ACCEPTED.value(), "games", new DataObject<String>(rtrn.toString()));
	}
	/*
	 * view and clear home
	 */
	public ResponseBody<List<Game>> getGamesSchoolIdNotification(School s) {
		Iterable<Teams> ts = tr.findBySchool_Id(s.getId());
		HashSet<Game> gs = new HashSet<Game>();
		for(Teams t : ts) {
			Game g = new Game();
			g.setHometeamId(t.getId());
			g.setHomeNotification(true);
			g.setAwayNotification(true);
			gs.addAll(getGamesIdNotification(g).getResult());
		}
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Games found", new ArrayList<Game>(gs));
	}
}
