package com.setgreen.services.mailservice;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.setgreen.model.User;
import com.setgreen.model.mail.Mail;
public class MailHandler {
	private JavaMailSenderImpl mailSender;
	private static final String EMAIL_SENDER = "Bbaronx@gmail.com";
	private static final String HOSTNAME = "http://localhost:3000/"/*"https://d3dqstghi7h8sb.cloudfront.net/"*/;
	@Autowired
	public MailHandler(JavaMailSenderImpl ms) {
		ms.setHost("email-smtp.us-east-1.amazonaws.com");
		ms.setPort(587);
		ms.setUsername("AKIAXJKN3KOWCWAMOSPU");
		ms.setPassword("BMWcww0kVhm4N0Kujxr6cf9vVkzQBmxakgSHP7rt4HL1");
		mailSender = ms;
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
	
	public String debugMessage(Mail m) {
		return "To: " + m.getSendTo() + "\nSubject: " + m.getSubjectLine() + "\nMessage " + m.getEmailContent();
	}
	
	public Mail inviteUser(User toInvite) throws UnsupportedEncodingException {
		Mail m = new Mail();
		m.setSendTo(toInvite.getEmail());
		m.setSubjectLine("Invite to schedule games");//XXX BETTER LINK SYSTEM
		m.setEmailContent("You have been invited to join an email scheduling system.\nFollow this link to finish the sign up process: "+HOSTNAME+"api/auth/login?u="+URLEncoder.encode(toInvite.getEmail(), "UTF-8")+"&p="+toInvite.getPassword());
		return m;
	}
	public String genLink() {//XXX MOVE TO UTILITY CLASS. If we have time to do that. Also it should be named "genString()" and have an override of "genString(int lengthOfString)" if I find the time
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
