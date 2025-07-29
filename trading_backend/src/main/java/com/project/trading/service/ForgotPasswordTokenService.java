package com.project.trading.service;

import org.springframework.stereotype.Service;

import com.project.trading.domain.VerificationType;
import com.project.trading.model.ForgotPasswordToken;
import com.project.trading.model.User;

@Service
public interface ForgotPasswordTokenService {
    public ForgotPasswordToken createForgotPasswordToken(User user, VerificationType verificationType, String sendTo, String otp);
    public ForgotPasswordToken updateForgotPasswordToken(ForgotPasswordToken forgotPasswordToken);
    public ForgotPasswordToken getForgotPasswordTokenById(String id);
    public ForgotPasswordToken getForgotPasswordTokenByUserId(Long userId);
    public void deleteForgotPasswordToken(ForgotPasswordToken forgotPasswordToken);
}
