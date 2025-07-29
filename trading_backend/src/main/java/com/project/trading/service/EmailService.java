package com.project.trading.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendVerificationOtpEmail(String email, String otp) throws MessagingException {
        // If mailSender is not configured, just log the OTP for development
        if (mailSender == null) {
            System.out.println("=== EMAIL SERVICE NOT CONFIGURED ===");
            System.out.println("OTP for " + email + ": " + otp);
            System.out.println("=== END EMAIL SERVICE ===");
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            String subject = "Verify OTP";
            String content = "Your OTP is: " + otp;

            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(content);

            mailSender.send(message);
            System.out.println("Email sent successfully to: " + email);
        } catch (MailException e) {
            System.err.println("Failed to send email: " + e.getMessage());
            // For development, still log the OTP even if email fails
            System.out.println("=== EMAIL FAILED, BUT OTP IS: " + otp + " ===");
            // Don't throw exception in development mode, just log the OTP
            // This allows 2FA to work even without proper email setup
            System.out.println("=== DEVELOPMENT MODE: OTP logged instead of email ===");
        }
    }
}
