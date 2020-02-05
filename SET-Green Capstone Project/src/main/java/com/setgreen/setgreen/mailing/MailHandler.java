package com.setgreen.setgreen.mailing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.setgreen.setgreen.model.User;

import org.springframework.mail.SimpleMailMessage;
public class MailHandler {
	private JavaMailSenderImpl mailSender;
	private static final String EMAIL_SENDER = "Bbaronx@gmail.com";
	@Autowired
	public MailHandler(JavaMailSenderImpl mlSndr) {
		mlSndr.setHost("email-smtp.us-east-1.amazonaws.com");
		mlSndr.setPort(587);
		mlSndr.setUsername("AKIAXJKN3KOWCWAMOSPU");
		mlSndr.setPassword("BMWcww0kVhm4N0Kujxr6cf9vVkzQBmxakgSHP7rt4HL1");
		this.mailSender = mlSndr;
	}
	
	//TODO this method is kinda debug and can send any email message to anyone, that's a bit undesirable for security reasons.
	public void sendMailMessage(Mail m) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setFrom(EMAIL_SENDER);
		msg.setTo(m.getSendTo());
		msg.setSubject(m.getSubjectLine());
		msg.setText(m.getEmailContent());
		mailSender.send(msg);
	}
	
	public Mail inviteUser(String toInvite) {
		Mail m = new Mail();
		m.setSendTo(toInvite);
		m.setSubjectLine("Invite to schedule games");
		m.setEmailContent("You have been invited to join an email scheduling system.\nFollow this link to finish the sign up process: "+genLink());
		return m;
	}
	private String genLink() {
		return "nop";//TODO this method
	}
}
