package com.project.trading.service;

import org.springframework.stereotype.Service;

import com.project.trading.model.PaymentDetails;
import com.project.trading.model.User;

@Service
public interface PaymentDetailsService {
    PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String bankName, String ifsc, User user);
    PaymentDetails getPaymentDetailsByUserId(Long userId);
}
