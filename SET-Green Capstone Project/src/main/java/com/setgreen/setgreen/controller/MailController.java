package com.setgreen.setgreen.controller;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.setgreen.setgreen.mailing.Mail;
import com.setgreen.setgreen.mailing.MailHandler;

@RestController
@RequestMapping("api/auth/mail")
public class MailController {
	@PostMapping("")
	public void mailOut(@RequestBody Mail m) {
		MailHandler mh = new MailHandler(new JavaMailSenderImpl());
		mh.sendMailMessage(m);
	}
}
