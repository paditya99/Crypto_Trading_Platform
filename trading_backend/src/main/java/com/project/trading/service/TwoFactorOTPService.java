package com.project.trading.service;

import org.springframework.stereotype.Service;

import com.project.trading.model.TwoFactorOTP;
import com.project.trading.model.User;

@Service
public interface TwoFactorOTPService {
    public TwoFactorOTP createTwoFactorOTP(User user, String jwt, String otp);

    public boolean verifyTwoFactorOTP(TwoFactorOTP twoFactorOTP, String otp);

    public void deleteTwoFactorOTP(TwoFactorOTP twoFactorOTP);

    public TwoFactorOTP findByUser(Long userId);

    public TwoFactorOTP findById(String id);


}
