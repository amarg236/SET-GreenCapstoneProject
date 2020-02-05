package com.setgreen.setgreen.services.MailService; //FIXME Is this the same as mailing.MailHandler?

import com.setgreen.setgreen.model.Mail.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

public class MailHandlerService {
    private JavaMailSenderImpl mailSender;
    private static final String EMAIL_SENDER = "Bbaronx@gmail.com";
    @Autowired
    public MailHandlerService(JavaMailSenderImpl mlSndr) {
        mlSndr.setHost("email-smtp.us-east-1.amazonaws.com");
        mlSndr.setPort(587);
        mlSndr.setUsername("AKIAXJKN3KOWCWAMOSPU");
        mlSndr.setPassword("BMWcww0kVhm4N0Kujxr6cf9vVkzQBmxakgSHP7rt4HL1");
        this.mailSender = mlSndr;
    }

    public void sendMailMessage(Mail m) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(EMAIL_SENDER);
        msg.setTo(m.getSendTo());
        msg.setSubject(m.getSubjectLine());
        msg.setText(m.getEmailContent());
        mailSender.send(msg);
    }
}
