package com.project.trading.service;

import org.springframework.stereotype.Service;

import com.project.trading.domain.VerificationType;
import com.project.trading.model.User;
import com.project.trading.model.VerificationCode;

@Service
public interface VerificationCodeService {
    
    VerificationCode sendVerificationCode(VerificationType verificationType, User user);
    VerificationCode getVerificationCodeById(Long id);
    VerificationCode getVerificationCodeByUserId(Long userId);
    void deleteVerificationCode(VerificationCode verificationCode);
}
