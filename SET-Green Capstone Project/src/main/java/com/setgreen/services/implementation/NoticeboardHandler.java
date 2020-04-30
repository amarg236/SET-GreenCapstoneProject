package com.setgreen.services.implementation;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.model.Game;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.noticeboard.Notice;
import com.setgreen.repositories.GameRepo;
import com.setgreen.repositories.noticeboard.NoticeRepo;

@Service
public class NoticeboardHandler {
	@Autowired
	NoticeRepo nr;
	@Autowired
	GameRepo gr;
	
	public ResponseBody<Notice> saveNotice(Notice n){
		try {
			nr.save(n);
			return new ResponseBody<Notice>(HttpStatus.ACCEPTED.value(), "notice saved", n);
		}
		catch(Exception e) {
			return new ResponseBody<Notice>(HttpStatus.BAD_REQUEST.value(), "Error saving notice: " + e.getMessage(), n);
		}
	}
	
	public ResponseBody<Notice> deleteNotice(Notice n){
		try {
			Notice _n = nr.findById(n.getId()).get();
			nr.deleteById(n.getId());
			return new ResponseBody<Notice>(HttpStatus.ACCEPTED.value(), "notice deleted", _n);
		}
		catch(Exception e){
			return new ResponseBody<Notice>(HttpStatus.BAD_REQUEST.value(), "Did not delete notice: " + e.getMessage(), n);
		}
	}

	public ResponseBody<List<Notice>> getNotices(int numOfGameDaysToGet) {
		try {
			List<Notice> ln = nr.findAll();
			if(numOfGameDaysToGet > 0) {
				ln.add(getGameList(numOfGameDaysToGet).getResult());
			}
			
			return new ResponseBody<List<Notice>>(HttpStatus.ACCEPTED.value(), "notices", ln);
		}
		catch(Exception e) {
			return new ResponseBody<List<Notice>>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to fetch notices", null);
		}
	}

	public ResponseBody<Notice> getGameList(int numOfDays) {
		try {
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date d = new Date();
			Date s = sdf.parse(sdf.format(d));
			d.setTime(d.getTime()+numOfDays*86400000);
			Date e = sdf.parse(sdf.format(d));
			Notice n = new Notice();
			n.setAuthor("AUTO GENERATED");
			List<Game> gl = gr.findByBetweenDateAndApprovedTrueAndAwayAcceptedTrue(s, e);
			sdf.applyPattern("hh:mm");
			n.setTitle("Games in the next " + 24*numOfDays + " hours:" );
			for(Game g : gl) {
				n.setDescription("\n"+g.getHometeam() + " vs. " + g.getAwayteam() + " at " + sdf.format(g.getTime()));
			}
			return new ResponseBody<Notice>(HttpStatus.ACCEPTED.value(), "notices", n);
		}
		catch(Exception e) {
			return new ResponseBody<Notice>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to fetch notices: " + e.getMessage(), null);
		}
	}
}
