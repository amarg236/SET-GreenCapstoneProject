package com.setgreen.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.repositories.GameRepo;

public class GameHandler {
	@Autowired
	private GameRepo gr;
	
	public ResponseBody saveGame(Game g){
		try{
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
}
