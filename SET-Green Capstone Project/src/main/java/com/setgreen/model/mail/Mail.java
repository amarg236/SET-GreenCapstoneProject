package com.setgreen.model.mail;

import lombok.Data;

@Data
public class Mail {
	private String sendTo;
	private String subjectLine;
	private String emailContent;
	public Mail() {}
}