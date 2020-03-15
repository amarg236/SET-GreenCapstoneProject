package com.setgreen.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.setgreen.model.District;
import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.Role;
import com.setgreen.model.School;
import com.setgreen.model.mail.Mail;
import com.setgreen.repositories.GameRepo;
import com.setgreen.repositories.RoleRepo;
import com.setgreen.repositories.TeamsRepo;
import com.setgreen.services.mailservice.MailHandler;
import com.setgreen.util.DataObject;

@Service
public class GameHandler {
	@Autowired
	private GameRepo gr;
	@Autowired
	private RoleRepo rr;
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
			gr.save(g);
			return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), /*"Game Saved"*/ str, g);
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
	public ResponseBody<Long> teamVerifyGame(Long g) {//TODO verification of team
		try{
			gr.updateAccept(g, true);
			return new ResponseBody<Long>(HttpStatus.ACCEPTED.value(), "Game Accepted", g);
		}
		catch(Exception e) {
			return new ResponseBody<Long>(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Accept Game", g);
		}
	}
	@Transactional
	public ResponseBody<Game> rejectGame(Game g){ //TODO this should remove game and inform other guy
		try {
			gr.updateAccept(g.getId(), false);
			return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), "Game Rejected", g);
		}
		catch(Exception e) {
			return new ResponseBody<Game>(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Reject Game", g);
		}
	}
	
	/**
	 * @param g ID of a game to verify
	 * @return Response body detailing the status of the verification
	 */
	@Transactional
	public ResponseBody<Long> adminVerifyGame(Long g) {
		try {
			gr.updateVerify(g.longValue(), true);
			gr.updateAccept(g.longValue(), true);
			return new ResponseBody<Long>(HttpStatus.ACCEPTED.value(), "Game Verified", g);
		}
		catch(Exception e) {
			return new ResponseBody<Long>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not verify game " + e, g);
		}
	}

	public ResponseBody<Iterable<Game>> getGamesUserVerified(District d) {
		try{
			Iterable<Game> g;
			g = gr.findInDistrictAccepted(d.getDistrictName());
			return new ResponseBody<Iterable<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<Iterable<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games", null);
		}
	}
	
	public ResponseBody<Iterable<Game>> getGames(School s, boolean findAll) { //FIXME URGENT doesn't care about district. Fix that
		try{
			Iterable<Game> g;
			if(findAll) {
				g = gr.findInSchoolAll(s.getName());
			}
			else {
				g = gr.findInSchoolVerified(s.getName());
			}
			return new ResponseBody<Iterable<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<Iterable<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games "+e, null);
		}
	}
	
	public ResponseBody<Iterable<Game>> getGames(District d, boolean findAll){
		try {
			Iterable<Game> g;
			
				if(findAll) {
					g = gr.findInDistrictAll(d.getDistrictName());
				}
				else {
					g = gr.findInDistrictVerified(d.getDistrictName());
				}
			return new ResponseBody<Iterable<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<Iterable<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games", null);
		}
	}
	
	public ResponseBody<Iterable<Game>> allGames() {
		return new ResponseBody<Iterable<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findAll());
	}
	public ResponseBody<Iterable<Game>> allVerifiedGames(){
		return new ResponseBody<Iterable<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findAllVerified());
	}

	public ResponseBody<Game> RequestReschedule(Game g) {
		// TODO Auto-generated method stub
		return null;
	}

	public Game getGameById(DataObject<Long> id) {
		return gr.findById(id.getData()).get();
	}

	public ResponseBody<List<Game>> JsonGetAll(){
		return new ResponseBody<List<Game>>(HttpStatus.ACCEPTED.value(), "Found games", gr.findAllByAwayAcceptedTrue());
	}

	public Game getGameById(Long id) {
		return getGameById(new DataObject<Long>(id));
	}
	
	public ResponseBody<Iterable<Game>> unverifiedGames(School s) {
		return new ResponseBody<Iterable<Game>>(HttpStatus.ACCEPTED.value(), "Found Games", gr.findByApprovedFalse());
	}
}
