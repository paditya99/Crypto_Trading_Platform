package com.project.trading.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.trading.model.PaymentDetails;
import com.project.trading.model.User;
import com.project.trading.service.PaymentDetailsService;
import com.project.trading.service.UserService;

@RestController
@RequestMapping("/api/payment-details")
public class PaymentDetailsController {

    @Autowired
    private PaymentDetailsService paymentDetailsService;

    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<PaymentDetails> getPaymentDetailsByUserId(@RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        PaymentDetails paymentDetails=paymentDetailsService.getPaymentDetailsByUserId(user.getId());
        return ResponseEntity.ok(paymentDetails);
    }

    @PostMapping()
    public ResponseEntity<PaymentDetails> addPaymentDetails(@RequestBody PaymentDetails paymentDetailsRequest, @RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        PaymentDetails paymentDetails=paymentDetailsService.addPaymentDetails(paymentDetailsRequest.getAccountNumber(), paymentDetailsRequest.getAccountHolderName(), paymentDetailsRequest.getBankName(), paymentDetailsRequest.getIfsc(), user);
        return ResponseEntity.ok(paymentDetails);
    }

   
}
