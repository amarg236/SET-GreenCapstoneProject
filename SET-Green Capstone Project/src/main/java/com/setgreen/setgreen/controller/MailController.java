package com.setgreen.setgreen.controller;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Mail.Mail;
import com.setgreen.setgreen.services.MailService.MailHandler;

import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("api/mail/")
public class MailController {

	@PostMapping("sendEmail")
	public ResponseBody mailOut(@RequestBody Mail m) {
		MailHandler mh = new MailHandler(new JavaMailSenderImpl());
		mh.sendMailMessage(m);
		return new ResponseBody(HttpStatus.ACCEPTED.value(), "Email successfully sent to user.",new Mail());    
	}
}
