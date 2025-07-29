package com.project.trading.service;

import org.springframework.stereotype.Service;

import com.project.trading.domain.PaymentMethod;
import com.project.trading.model.PaymentOrder;
import com.project.trading.model.User;
import com.project.trading.response.PaymentResponse;
import com.stripe.exception.StripeException;

@Service
public interface PaymentService {
    PaymentOrder createPaymentOrder(Long amount, PaymentMethod paymentMethod, User user);
    PaymentOrder getPaymentOrderById(Long id);
    boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId);
    PaymentResponse createRazorpayPaymentLink(Long amount, User user, Long orderId);
    PaymentResponse createStripePaymentLink(Long amount, User user, Long orderId) throws StripeException;
    
}
