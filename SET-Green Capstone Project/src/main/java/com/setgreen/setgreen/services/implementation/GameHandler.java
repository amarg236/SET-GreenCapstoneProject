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
import com.setgreen.setgreen.model.Mail.Mail;
import com.setgreen.setgreen.repositories.GameRepo;
import com.setgreen.setgreen.repositories.RoleRepo;
import com.setgreen.setgreen.services.MailService.MailHandler;

@Service
public class GameHandler {
	@Autowired
	private GameRepo gr;
	@Autowired
	private RoleRepo rr;
	
	/**Attempts to save a game, and send an email to the involved coaches.
	 * @param g Game to save
	 * @return ResponseBody result of attempting to save game
	 */
	public ResponseBody saveGame(Game g){
		try{
			Iterable<String> i = rr.findOver(g.getAwayteam(), g.getAwaydistrict());
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
			return new ResponseBody(HttpStatus.ACCEPTED.value(), /*"Game Saved"*/ str, g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Did not save game", g);
		}
	}
	
	public ResponseBody deleteGame(Long g) {
		try {
			gr.deleteById(g.longValue());
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Game Deleted", g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Delete Game", g);
		}
	}
	
	//FIXME better implementation w/ a custom method, or at least do a "find game" check.
	public ResponseBody modifyGame(Game g) {
		try {
			gr.deleteById(g.getId());
			Game ng = gr.save(g);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Game modified", ng);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not modify Game", g);
		}
	}
	
	public ResponseBody acceptGame(Game g) {
		try{
			gr.updateAccept(g.getTime(), g.getLocation(), true);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Game Accepted", g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Accept Game", g);
		}
	}
	
	public ResponseBody verifyGame(Long g) {
		try {
			gr.updateVerify(g.longValue(), true);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Game Verified", g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Could not verify game", g);
		}
	}

	public ResponseBody getGames(School s, boolean findAll) {
		try{
			Iterable<Game> g;
			if(findAll) {
				g = gr.findInSchoolAll(s.getDistrictName(), s.getName());
			}
			else {
				g = gr.findInSchoolVerified(s.getDistrictName(), s.getName());
			}
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games", null);
		}
	}
	
	public ResponseBody getGames(District d, boolean findAll){
		try {
			Iterable<Game> g;
			
				if(findAll) {
					g = gr.findInDistrictAll(d.getDistrictName());
				}
				else {
					g = gr.findInDistrictVerified(d.getDistrictName());
				}
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Found games", g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Could not find games", null);
		}
	}
	
	public ResponseBody allGames() {
		return new ResponseBody(HttpStatus.ACCEPTED.value(), "Found games", gr.findAll());
	}
}
