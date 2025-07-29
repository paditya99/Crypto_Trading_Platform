package com.project.trading.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.TwoFactorOTP;
@Repository
public interface TwoFactorOTPRepo extends JpaRepository<TwoFactorOTP, String>{
    TwoFactorOTP findByUserId(Long userId);
}



