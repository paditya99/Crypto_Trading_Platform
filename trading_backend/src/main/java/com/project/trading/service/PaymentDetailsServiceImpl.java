package com.project.trading.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.model.PaymentDetails;
import com.project.trading.model.User;
import com.project.trading.repository.PaymentDetailsRepo;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    @Autowired
    private PaymentDetailsRepo paymentDetailsRepo;

    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String bankName,
            String ifsc, User user) {
        PaymentDetails paymentDetails=new PaymentDetails();
        paymentDetails.setAccountNumber(accountNumber);
        paymentDetails.setAccountHolderName(accountHolderName);
        paymentDetails.setBankName(bankName);
        paymentDetails.setIfsc(ifsc);
        paymentDetails.setUser(user);
        return paymentDetailsRepo.save(paymentDetails);
    }

    @Override
    public PaymentDetails getPaymentDetailsByUserId(Long userId) {
        return paymentDetailsRepo.findByUserId(userId);
    }
    
}
