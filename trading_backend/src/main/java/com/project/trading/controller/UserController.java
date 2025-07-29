package com.project.trading.controller;


import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.trading.domain.VerificationType;
import com.project.trading.model.ForgotPasswordToken;
import com.project.trading.model.User;
import com.project.trading.model.VerificationCode;
import com.project.trading.request.ForgotPasswordTokenRequest;
import com.project.trading.request.ResetPasswordRequest;
import com.project.trading.response.ApiResponse;
import com.project.trading.response.AuthResponse;
import com.project.trading.service.EmailService;
import com.project.trading.service.ForgotPasswordTokenService;
import com.project.trading.service.UserService;
import com.project.trading.service.VerificationCodeService;
import com.project.trading.utils.OtpUtils;

import javax.mail.MessagingException;

@RestController
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordTokenService forgotPasswordTokenService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    // The below 2 endpoints are for verification and enable two factor auth -- sendOtp, verifyOtp

    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(@PathVariable("verificationType") VerificationType verificationType, @RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        VerificationCode verificationCode=verificationCodeService.getVerificationCodeByUserId(user.getId());
        if(verificationCode==null){
            verificationCode=verificationCodeService.sendVerificationCode(verificationType, user);
        }
        if(verificationType.equals(VerificationType.EMAIL)){
            try {
                emailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());
            } catch (MessagingException e) {
                // Log the error but don't fail the request
                System.err.println("Email service error: " + e.getMessage());
                System.out.println("=== OTP for " + user.getEmail() + ": " + verificationCode.getOtp() + " ===");
            }
        }
        // Return OTP in response for development
        String response = "Verification code sent successfully. OTP: " + verificationCode.getOtp();
        return new ResponseEntity<String>(response, HttpStatus.OK);
        
    }

    @PostMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuth(@PathVariable("otp") String otp, @RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        VerificationCode verificationCode=verificationCodeService.getVerificationCodeByUserId(user.getId());
        String sendTo=verificationCode.getVerificationType().equals(VerificationType.EMAIL) ? verificationCode.getEmail() : verificationCode.getMobile();
        boolean isVerified=verificationCode.getOtp().equals(otp);
        if(isVerified){
            User updateduser= userService.enableTwoFactorAuth(verificationCode.getVerificationType(), sendTo, user);
            verificationCodeService.deleteVerificationCode(verificationCode);
            return new ResponseEntity<User>(updateduser, HttpStatus.OK);
        }
        throw new RuntimeException("Invalid OTP");
    }

    @PostMapping("/api/users/disable-two-factor")
    public ResponseEntity<User> disableTwoFactorAuth(@RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        userService.disableTwoFactorAuth(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    //The below 3 endpoints are for forgot password -- sendToken, verifyToken, resetPassword
    @PostMapping("/auth/users/forgot-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(@RequestBody ForgotPasswordTokenRequest req){
        User user=userService.findUserByEmail(req.getSendTo());
        String otp=OtpUtils.generateOtp();
        
        ForgotPasswordToken forgotPasswordToken=forgotPasswordTokenService.getForgotPasswordTokenByUserId(user.getId());
        if(forgotPasswordToken==null){
            forgotPasswordToken=forgotPasswordTokenService.createForgotPasswordToken( user, req.getVerificationType(), req.getSendTo(), otp);
        } else {
            // Update existing token with new OTP
            forgotPasswordToken.setOtp(otp);
            forgotPasswordToken=forgotPasswordTokenService.updateForgotPasswordToken(forgotPasswordToken);
        }
        if(req.getVerificationType().equals(VerificationType.EMAIL)){
            try {
                emailService.sendVerificationOtpEmail(user.getEmail(), otp);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
        AuthResponse res=new AuthResponse();
        res.setSession(forgotPasswordToken.getId().toString());
        res.setMessage("Password reset otp sent successfully");
        res.setOtp(otp); // Include OTP in response for development
        
        return new ResponseEntity<AuthResponse>(res, HttpStatus.OK);
        
    }

    @PostMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(@RequestParam("id") String id, @RequestBody ResetPasswordRequest req){
        ForgotPasswordToken forgotPasswordToken=forgotPasswordTokenService.getForgotPasswordTokenById(id);
        User user=forgotPasswordToken.getUser();
        boolean isVerified=forgotPasswordToken.getOtp().equals(req.getOtp());
        if(isVerified){
            userService.updatePassword(user, req.getNewPassword());
            ApiResponse res=new ApiResponse();
            res.setMessage("Password reset successfully");
            return new ResponseEntity<ApiResponse>(res, HttpStatus.OK);
        }
        throw new RuntimeException("Invalid otp");  
    }


}
