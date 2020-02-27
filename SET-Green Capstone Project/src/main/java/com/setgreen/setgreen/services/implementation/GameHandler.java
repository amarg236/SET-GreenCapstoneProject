package com.setgreen.setgreen.services.implementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Role;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.model.mail.Mail;
import com.setgreen.setgreen.repositories.GameRepo;
import com.setgreen.setgreen.repositories.RoleRepo;
import com.setgreen.setgreen.repositories.TeamsRepo;
import com.setgreen.setgreen.services.mailservice.MailHandler;
import com.setgreen.setgreen.util.DataObject;

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
			Iterable<String> i = rr.findByUserEmail(tr.findByTmName(g.getAwayteam()));
			String str = "";
			Mail m = new Mail();
			MailHandler snd = new MailHandler(new JavaMailSenderImpl());
			for(String x : i) {
				m.setSendTo(x);
				m.setSubjectLine("Game against "+g.getAwayteam()+".");
				m.setEmailContent(g.getAwayteam()+" has suggested a game to play.");
				//snd.sendMailMessage(m);//TODO Switch from debug to deploy
				str+=snd.debugMessage(m)+"\n";
			}
			gr.save(g);
			return new ResponseBody<Game>(HttpStatus.ACCEPTED.value(), /*"Game Saved"*/ str, g);
		}
		catch(Exception e) {
			return new ResponseBody<Game>(HttpStatus.NOT_ACCEPTABLE.value(), "Did not save game", g);
		}
	}
	
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
	
	public ResponseBody<Long> acceptGame(Long g) {//TODO verification of team
		try{
			gr.updateAccept(g, true);
			return new ResponseBody<Long>(HttpStatus.ACCEPTED.value(), "Game Accepted", g);
		}
		catch(Exception e) {
			return new ResponseBody<Long>(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Accept Game", g);
		}
	}
	
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
	public ResponseBody<Long> verifyGame(Long g) {
		try {
			gr.updateVerify(g.longValue(), true);
			return new ResponseBody<Long>(HttpStatus.ACCEPTED.value(), "Game Verified", g);
		}
		catch(Exception e) {
			return new ResponseBody<Long>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not verify game", g);
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
	
	public ResponseBody<Iterable<Game>> getGames(School s, boolean findAll) {
		try{
			Iterable<Game> g;
			if(findAll) {
				g = gr.findInSchoolAll(s.getDistrict().getDistrictName(), s.getName());
			}
			else {
				g = gr.findInSchoolVerified(s.getDistrict().getDistrictName(), s.getName());
			}
			return new ResponseBody<Iterable<Game>>(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody<Iterable<Game>>(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games", null);
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
}
