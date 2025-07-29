package com.project.trading.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.VerificationCode;

@Repository
public interface VerificationCodeRepo extends JpaRepository<VerificationCode, Long>{
    public VerificationCode findByUserId(Long userId);
}
