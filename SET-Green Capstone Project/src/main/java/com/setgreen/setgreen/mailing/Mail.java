package com.setgreen.setgreen.mailing;

import lombok.Data;

@Data
public class Mail {
	public String sendTo;
	public String subjectLine;
	public String emailContent;
	public Mail() {}
}