package com.setgreen.services.mailservice;
import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Properties;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.setgreen.model.User;
import com.setgreen.model.mail.Mail;
import com.setgreen.util.Debugger;
public class MailHandler {
	private JavaMailSenderImpl mailSender;
	private final String path = "mailing.prop";
	private String HOSTNAME;
	private String USERNAME;
	private String PASSWORD;
	private String EMAIL_SENDER;
	private int PORT;
	private String SERVER;
	@Autowired
	public MailHandler(JavaMailSenderImpl ms) {
		Properties p = new Properties();
		try {
			p.load(new FileInputStream(path));
			USERNAME = p.getProperty("username");
			PASSWORD = p.getProperty("password");
			EMAIL_SENDER = p.getProperty("email");
			PORT = Integer.parseInt(p.getProperty("port"));
			SERVER = p.getProperty("server");
			HOSTNAME = p.getProperty("hostname");
		}
		catch(Exception e) {
			System.out.println("Did not initialize mail server" + e);
			HOSTNAME = "http://localhost:3000/";
			USERNAME = "username";
			PASSWORD = "password";
			EMAIL_SENDER = "email";
			PORT = 0;
			SERVER = "server";
		}
		ms.setHost(SERVER);
		ms.setPort(PORT);
		ms.setUsername(USERNAME);
		ms.setPassword(PASSWORD);
		mailSender = ms;
	}
	
	private void sendMailMessage(Mail m) {
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
	public void inviteUser(User toInvite) throws UnsupportedEncodingException {
		sendMailMessage(_inviteUser(toInvite));
	}
	public Mail _inviteUser(User toInvite) throws UnsupportedEncodingException {
		Mail m = new Mail();
		m.setSendTo(toInvite.getEmail());
		m.setSubjectLine("Invite to schedule games");
		m.setEmailContent("You have been invited to join an email scheduling system.\nFollow this link to finish the sign up process: "+HOSTNAME+"verify/login?u="+URLEncoder.encode(toInvite.getEmail(), "UTF-8")+"&p="+toInvite.getPassword());
		return m;
	}
	public void forgotPassword(String who, String tempPw) throws UnsupportedEncodingException{
		Mail m = new Mail();
		m.setSendTo(who);
		m.setSubjectLine("Soccer Scheduling Forgotten Password");
		m.setEmailContent("A request to change your password has been recieved. If you did not send this request, you may safely ignore this email.\n\nClick this link to reset your password:\n"+HOSTNAME+"api/auth/resetPassword"+"?pwd="+tempPw);
		sendMailMessage(m);
	}
	public String genLink() {
		return genLink(30);
	}
	
	public String genLink(int length) {
		String s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		s = s+s.toLowerCase()+"0123456789";
		Random r = new Random();
		byte[] a = new byte[length];
		r.nextBytes(a);
		String k = "";
		for(byte b : a) {
			k = k+s.charAt(Math.abs(b)%s.length()); 
		}
		return k;
	}
}
