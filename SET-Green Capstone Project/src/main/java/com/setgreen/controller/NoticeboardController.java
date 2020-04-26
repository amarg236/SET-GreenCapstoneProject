package com.setgreen.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.setgreen.model.ResponseBody;
import com.setgreen.model.noticeboard.Notice;
import com.setgreen.services.implementation.NoticeboardHandler;

@RestController
@CrossOrigin
@RequestMapping("api/notice/")
public class NoticeboardController {
	
	@Autowired
	private ControllerAssistant hlp;
	@Autowired
	private NoticeboardHandler nh;
	
	@PostMapping("add")//Requires all data
	public ResponseBody<Notice> addNotice(Notice n, Authentication auth){
		return hlp.getRoleByBest(auth).addNotice(auth, n);
	}
	@PostMapping("delete")//Only requires ID
	public ResponseBody<Notice> deleteNotice(Notice n, Authentication auth){
		return hlp.getRoleByBest(auth).deleteNotice(auth, n);
	}
	@PostMapping("get")//Requires nothing
	public ResponseBody<List<Notice>> getNotice(){
		return nh.getNotices();
	}
}
