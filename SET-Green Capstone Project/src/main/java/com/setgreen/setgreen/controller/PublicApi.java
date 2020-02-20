package com.setgreen.setgreen.controller;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.Game;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.services.implementation.GameHandler;

@RestController
@CrossOrigin
@RequestMapping("api/public/")
public class PublicApi {
	@Autowired
	GameHandler gh = new GameHandler();
	
	/** Gets all the verified games in a district
	 * @param district String name of district for games
	 * @return ResponseBody status of request
	 */
	@PostMapping("get/game/district")
	public ResponseBody getDistrict(@RequestBody District d) {
		ResponseBody rb = gh.getGames(d, false);
		if(rb.getHttpStatusCode() == 202) { //FIXME FUCKED
			try {
				Iterable<Game> ig = (Iterable<Game>) rb.getResult();
				String s = "{\"EventsData\":[";
				for(Game g : ig) {
					s += new CalanderFormat(g).toString() + ",";
				}
				s=s.substring(0, s.length()-2);
				s+="]}";
				rb.setResult(s);
			}
			catch(Exception e) {
				rb.setResult(null);
			}
		}
		else {
			rb.setResult(null);
		}
		return rb;
	}
	
	private class CalanderFormat{
		Long id;
		String sbjct;
		String lctn;
		Date strtTme;
		Date endTme;
		String desc;
		int ownr;
		CalanderFormat(Game g){
			id = g.getId();
			sbjct = g.getHometeam() + " vs " + g.getAwayteam();
			lctn = g.getLocation();
			strtTme = g.getTime();
			Calendar c = Calendar.getInstance();
			c.set(Calendar.HOUR, (int) g.getTime().getTime()/3600000+g.getDuration());
			endTme = c.getTime();
			desc = g.getLocation();
			ownr = g.getId().intValue();
		}
		
		@Override
		public String toString(){
			return  "{\"Id\":" + id +
					",\"Subject\":\""+ sbjct +
					"\",\"Location\":\""+ lctn +
					"\",\"StartTime\":\""+ strtTme +
					"\",\"EndTime\": \""+ endTme +
					"\",\"Description\":\""+ desc +
					"\",\"Owner\": "+ ownr +"}";
		}
	}
}

