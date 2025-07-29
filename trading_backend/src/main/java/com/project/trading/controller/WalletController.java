package com.project.trading.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.trading.model.Order;
import com.project.trading.model.PaymentOrder;
import com.project.trading.model.User;
import com.project.trading.model.Wallet;
import com.project.trading.model.WalletTransaction;
import com.project.trading.service.OrderService;
import com.project.trading.service.PaymentService;
import com.project.trading.service.UserService;
import com.project.trading.service.WalletService;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    
    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;


    @GetMapping("/get-wallet")
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        Wallet wallet=walletService.getUserWallet(user);

        return new ResponseEntity<>(wallet,HttpStatus.OK);
    }

    @PutMapping("/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransfer(@RequestHeader("Authorization") String jwt, @PathVariable("walletId") Long walletId, @RequestBody WalletTransaction req){
        User senderUser=userService.findUserProfileByJwt(jwt);
        Wallet receiverWallet=walletService.findWalletById(walletId);

        Wallet wallet=walletService.walletToWalletTransfer(senderUser, receiverWallet, req.getAmount());
        return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }

    @PutMapping("/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(@RequestHeader("Authorization") String jwt, @PathVariable("orderId") Long orderId){
        User user=userService.findUserProfileByJwt(jwt);
        Order order=orderService.findOrderById(orderId);
        Wallet wallet=walletService.payOrderPayment(order, user);

        return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }

    @PutMapping("/deposit")
    public ResponseEntity<Wallet> addMoneyToWallet(@RequestHeader("Authorization") String jwt, 
                                                     @RequestParam(name="order_id") Long orderId, 
                                                     @RequestParam(name="payment_id") String paymentId){
        User user=userService.findUserProfileByJwt(jwt);
        Wallet wallet=walletService.getUserWallet(user);

        PaymentOrder paymentOrder=paymentService.getPaymentOrderById(orderId);
        boolean isPaymentSuccess=paymentService.proceedPaymentOrder(paymentOrder, paymentId);

        if(isPaymentSuccess){
            wallet=walletService.addMoneyToWallet(wallet, paymentOrder.getAmount());
        }

        return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<WalletTransaction>> getUserWalletTransactions(@RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        Wallet wallet=walletService.getUserWallet(user);
        List<WalletTransaction> transactions=walletService.getUserWalletTransactions(wallet);
        return new ResponseEntity<>(transactions,HttpStatus.ACCEPTED);
    }



}
