package com.setgreen.services.implementation;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.setgreen.model.District;
import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.Role;
import com.setgreen.model.School;
import com.setgreen.model.Teams;
import com.setgreen.model.mail.Mail;
import com.setgreen.repositories.GameRepo;
import com.setgreen.repositories.SchoolRepo;
import com.setgreen.repositories.TeamsRepo;
import com.setgreen.services.mailservice.MailHandler;
import com.setgreen.util.DataObject;
import com.setgreen.util.Debugger;

@Service
public class GameHandler {
	@Autowired
	private GameRepo gr;
	@Autowired
	private TeamsRepo tr;
	/**Attempts to save a game, and send an email to the involved coaches.
	 * @param g Game to save
	 * @return ResponseBody result of attempting to save game
	 */
	public ResponseBody<Game> saveGame(Game g){
		try{
			String str = "";
			try {
				Mail m = new Mail();
				MailHandler snd = new MailHandler(new JavaMailSenderImpl());
				Iterable<Role> i = tr.findByTmName(g.getAwayteam()).getSchool().getRoles();
				for(Role x : i) {
					m.setSendTo(x.getUser().getEmail());
					m.setSubjectLine("Game against "+g.getAwayteam()+".");
					m.setEmailContent(g.getAwayteam()+" has suggested a game to play.");
					//snd.sendMailMessage(m);//TODO Switch from debug to deploy
					str+=snd.debugMessage(m)+"\n";
				}
			}
			catch(NullPointerException e) {
				str = "No coaches of that email found.";
			}
			System.out.println(g);
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
	
	//FIXME better implementation w/ a custom method, or at least do a "find game" check.
	@Transactional
	public ResponseBody<Game> modifyGame(Game g) {
		try {
			gr.deleteById(g.getId());
			Game ng = gr.save(g);
			return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), "Game modified", ng);
		}
		catch(Exception e) {
			return new ResponseBody<Game>(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not modify Game", g);
		}
	}
	@Transactional
	public ResponseBody<Long> teamVerifyGame(Authentication auth, Long g) {//TODO verification of team
		try{
			gr.updateAwayteamNotification(g, false);
			//gr.updateHometeamNotification(g, true); FIXME implement clear for notifications
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
	
	public ResponseBody<List<Game>> getGames(Teams s, boolean findAll) { //FIXME URGENT doesn't care about district. Fix that
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
	
	public ResponseBody<List<Game>> getGamesId(Teams s, boolean findAll) {
		try{
			List<Game> g;
//			if(findAll) {
//				g = gr.findByTeamAll(tr.findById(s.getId()).get().getTmName());
//			}
//			else {
//				g = gr.findByTeamVerified(tr.findById(s.getId()).get().getTmName());
//			}
			g = gr.findByHometeamIdOrAwayteamIdAndApprovedAndRejectedFalse(s.getId(), s.getId(), findAll);
			return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<List<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games "+e, null);
		}
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

	public ResponseBody<Game> RequestReschedule(Game g) {
		// TODO Auto-generated method stub
		return null;
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
	
	public ResponseBody<List<Game>> unverifiedGames(School s) {
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found Games", gr.findByApprovedFalseAndRejectedFalse());
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
}
