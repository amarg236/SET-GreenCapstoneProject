package com.setgreen.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.model.ResponseBody;
import com.setgreen.model.noticeboard.Notice;
import com.setgreen.repositories.noticeboard.NoticeRepo;

@Service
public class NoticeboardHandler {
	@Autowired
	NoticeRepo nr;
	
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

	public ResponseBody<List<Notice>> getNotices() {
		try {
			return new ResponseBody<List<Notice>>(HttpStatus.ACCEPTED.value(), "notices", nr.findAll());
		}
		catch(Exception e) {
			return new ResponseBody<List<Notice>>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Failed to fetch notices", null);
		}
	}
}
