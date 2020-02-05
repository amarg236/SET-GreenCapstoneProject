package com.setgreen.setgreen.mailing; //FIXME Is this the same as MailService.MailHandlerService
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.setgreen.setgreen.model.User;

import org.springframework.mail.SimpleMailMessage;
public class MailHandler {
	private JavaMailSenderImpl mailSender;
	private static final String EMAIL_SENDER = "Bbaronx@gmail.com";
	private static final String HOSTNAME = "http://ec2-3-17-66-87.us-east-2.compute.amazonaws.com:8080/";
	@Autowired
	public MailHandler() {
		mailSender.setHost("email-smtp.us-east-1.amazonaws.com");
		mailSender.setPort(587);
		mailSender.setUsername("AKIAXJKN3KOWCWAMOSPU");
		mailSender.setPassword("BMWcww0kVhm4N0Kujxr6cf9vVkzQBmxakgSHP7rt4HL1");
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
		m.setEmailContent("You have been invited to join an email scheduling system.\nFollow this link to finish the sign up process: "+HOSTNAME+"api/auth?user="+toInvite+"&password="+genLink());
		return m;
	}
	public String genLink() {
		String s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		s = s+s.toLowerCase()+"0123456789";
		Random r = new Random();
		byte[] a = new byte[30];
		r.nextBytes(a);
		String k = "";
		for(byte b : a) {
			k = k+s.charAt(Math.abs(b)%s.length()); 
		}
		return k;
	}
}
