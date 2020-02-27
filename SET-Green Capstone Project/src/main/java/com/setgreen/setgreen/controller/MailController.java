package com.setgreen.setgreen.controller;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.mail.Mail;
import com.setgreen.setgreen.services.mailservice.MailHandler;

import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Brendon Lebaron
 *
 */
@RestController
@CrossOrigin
@RequestMapping("api/mail/")
public class MailController {

	/**
	 * @param m Mail object to send
	 * @return ResponseBody of type mail with the request and it's status
	 */
	@PostMapping("sendEmail")
	public ResponseBody<Mail> mailOut(@RequestBody Mail m) {
		MailHandler mh = new MailHandler(new JavaMailSenderImpl());
		mh.sendMailMessage(m);
		return new ResponseBody<Mail>(HttpStatus.ACCEPTED.value(), "Email successfully sent to user.", m);    
	}
}
