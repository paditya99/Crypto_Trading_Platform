package com.project.trading.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.ForgotPasswordToken;

@Repository
public interface ForgotPasswordTokenRepo extends JpaRepository<ForgotPasswordToken, String>{
    public ForgotPasswordToken findByUserId(Long userId);
}
