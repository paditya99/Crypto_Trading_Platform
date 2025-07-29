package com.project.trading.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.project.trading.domain.PaymentMethod;
import com.project.trading.model.PaymentOrder;
import com.project.trading.model.User;
import com.project.trading.response.PaymentResponse;
import com.project.trading.service.PaymentService;
import com.project.trading.service.UserService;
import com.stripe.exception.StripeException;

@RestController
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> createPaymentLink(@PathVariable("paymentMethod") PaymentMethod paymentMethod, @PathVariable("amount") Long amount, @RequestHeader("Authorization") String jwt) throws StripeException{
        User user=userService.findUserProfileByJwt(jwt);
        PaymentResponse paymentResponse=null;
        PaymentOrder paymentOrder=paymentService.createPaymentOrder(amount, paymentMethod, user);

        if(paymentMethod.equals(PaymentMethod.RAZORPAY)){
            paymentResponse=paymentService.createRazorpayPaymentLink(amount, user, paymentOrder.getId());
        }else if(paymentMethod.equals(PaymentMethod.STRIPE)){
            paymentResponse=paymentService.createStripePaymentLink(amount, user, paymentOrder.getId());
        }

        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
        
    }


    
}
