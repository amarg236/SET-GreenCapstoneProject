package com.setgreen.util;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;

public class CalanderFormat {
	Long id;
	String sbjct;
	String lctn;
	Date strtTme;
	Date endTme;
	String desc;
	int ownr;
	public CalanderFormat(Game g){
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
	
	public static ResponseBody<String> format(ResponseBody<List<Game>> responseBody) {
		ResponseBody<String> rtrn = new ResponseBody<String>(responseBody.getHttpStatusCode(), "calander formatted", null);
		if(rtrn.getHttpStatusCode() == 202) {
			try {
				Iterable<Game> ig = (Iterable<Game>) responseBody.getResult();
				String s = "{\"EventsData\":[";
				for(Game g : ig) {
					s += new CalanderFormat(g).toString() + ",";
				}
				s=s.substring(0, s.length()-2);
				s+="]}";
				rtrn = new ResponseBody<String>(responseBody.getHttpStatusCode(), "calander formatted", s);
			}
			catch(Exception e) {
				responseBody.setResult(null);
			}
		}
		return rtrn;
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
