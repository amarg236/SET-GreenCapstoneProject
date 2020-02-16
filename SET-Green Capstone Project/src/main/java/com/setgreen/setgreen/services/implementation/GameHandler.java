package com.setgreen.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Role;
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
	
	public ResponseBody saveGame(Game g){
		try{
			Iterable<String> i = rr.findOver(g.getAwayteam(), g.getAwaydistrict());
			Mail m = new Mail();
			MailHandler snd = new MailHandler(new JavaMailSenderImpl());
			for(String x : i) {
				m.setSendTo(x);
				m.setSubjectLine("Game against "+g.getAwayteam()+".");
				m.setEmailContent(g.getAwayteam()+" has suggested a game to play.");
				//snd.sendMailMessage(m);//TODO Switch from debug to deploy
				System.out.println(snd.debugMessage(m));
			}
			gr.save(g);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Game Saved", g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Did not save game", g);
		}
	}
	
	public ResponseBody deleteGame(Game g) {
		try {
			gr.delete(g);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Game Deleted", g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Delete Game", g);
		}
	}
	
	//FIXME better implementation w/ a custom method, or at least do a "find game" check.
	public ResponseBody modifyGame(Game g) {
		try {
			gr.delete(g);
			gr.save(g);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Game Deleted", g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Could Not Delete Game", g);
		}
	}
	
	
	public ResponseBody verifyGame(Game g) {
		try {
			gr.updateVerify(g.getTime(), g.getLocation(), true);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Game Verified", g);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.NOT_ACCEPTABLE.value(), "Could not verify game", g);
		}
	}
}
