package com.project.trading.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.PaymentDetails;

@Repository
public interface PaymentDetailsRepo extends JpaRepository<PaymentDetails, Long> {

    PaymentDetails findByUserId(Long userId);
}
