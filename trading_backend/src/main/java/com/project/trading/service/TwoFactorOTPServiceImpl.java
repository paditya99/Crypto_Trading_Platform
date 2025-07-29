package com.project.trading.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.model.TwoFactorOTP;
import com.project.trading.model.User;
import com.project.trading.repository.TwoFactorOTPRepo;

@Service
public class TwoFactorOTPServiceImpl implements TwoFactorOTPService{

    @Autowired
    private TwoFactorOTPRepo twoFactorOTPRepo;

    @Override
    public TwoFactorOTP createTwoFactorOTP(User user, String jwt, String otp) {
        TwoFactorOTP twoFactorOTP = new TwoFactorOTP();
        twoFactorOTP.setUser(user);
        twoFactorOTP.setJwt(jwt);
        twoFactorOTP.setOtp(otp);
        twoFactorOTP.setId(UUID.randomUUID().toString());
        return twoFactorOTPRepo.save(twoFactorOTP);
    }

    @Override
    public boolean verifyTwoFactorOTP(TwoFactorOTP twoFactorOTP, String otp) {
       return twoFactorOTP.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOTP(TwoFactorOTP twoFactorOTP) {
        twoFactorOTPRepo.delete(twoFactorOTP);
    }

    @Override
    public TwoFactorOTP findByUser(Long userId) {
        return twoFactorOTPRepo.findByUserId(userId);
    }

    @Override
    public TwoFactorOTP findById(String id) {
        Optional<TwoFactorOTP> twoFactorOTP = twoFactorOTPRepo.findById(id);
        return twoFactorOTP.orElse(null);
    }
    
}
