package com.project.trading.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.domain.VerificationType;
import com.project.trading.model.User;
import com.project.trading.model.VerificationCode;
import com.project.trading.repository.VerificationCodeRepo;
import com.project.trading.utils.OtpUtils;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService{

    @Autowired
    private VerificationCodeRepo verificationCodeRepo;

    @Override
    public VerificationCode sendVerificationCode(VerificationType verificationType, User user) {
        VerificationCode verificationCode=new VerificationCode();
        verificationCode.setOtp(OtpUtils.generateOtp());
        verificationCode.setVerificationType(verificationType);
        verificationCode.setUser(user);

        return verificationCodeRepo.save(verificationCode);
    }

    @Override
    public VerificationCode getVerificationCodeById(Long id) {
        Optional<VerificationCode> verificationCode=verificationCodeRepo.findById(id);
        if(verificationCode.isPresent()){
            return verificationCode.get();
        }
        throw new RuntimeException("Verification code not found");
    }

    @Override
    public VerificationCode getVerificationCodeByUserId(Long userId) {
        return verificationCodeRepo.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCode(VerificationCode verificationCode) {
        verificationCodeRepo.delete(verificationCode);
    }
    
}
