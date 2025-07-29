package com.project.trading.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.domain.VerificationType;
import com.project.trading.model.ForgotPasswordToken;
import com.project.trading.model.User;
import com.project.trading.repository.ForgotPasswordTokenRepo;

@Service
public class ForgotPasswordTokenServiceImpl implements ForgotPasswordTokenService{

    @Autowired
    private ForgotPasswordTokenRepo forgotPasswordTokenRepo;

    @Override
    public ForgotPasswordToken createForgotPasswordToken(User user, VerificationType verificationType, String sendTo,
            String otp) {
        ForgotPasswordToken forgotPasswordToken=new ForgotPasswordToken();
        forgotPasswordToken.setUser(user);
        forgotPasswordToken.setVerificationType(verificationType);
        forgotPasswordToken.setSendTo(sendTo);
        forgotPasswordToken.setOtp(otp);
        return forgotPasswordTokenRepo.save(forgotPasswordToken);
    }

    @Override
    public ForgotPasswordToken updateForgotPasswordToken(ForgotPasswordToken forgotPasswordToken) {
        return forgotPasswordTokenRepo.save(forgotPasswordToken);
    }

    @Override
    public ForgotPasswordToken getForgotPasswordTokenById(String id) {
        Optional<ForgotPasswordToken> forgotPasswordToken=forgotPasswordTokenRepo.findById(id);
        if(forgotPasswordToken.isPresent()){
            return forgotPasswordToken.get();
        }
        return null;
        //return forgotPasswordToken.orElse(null);
    }

    @Override
    public ForgotPasswordToken getForgotPasswordTokenByUserId(Long userId) {
        return forgotPasswordTokenRepo.findByUserId(userId);
    }

    @Override
    public void deleteForgotPasswordToken(ForgotPasswordToken forgotPasswordToken) {
        forgotPasswordTokenRepo.delete(forgotPasswordToken);
    }

    
    
}
