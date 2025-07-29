package com.project.trading.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.trading.domain.WalletTransactionType;
import com.project.trading.model.User;
import com.project.trading.model.Wallet;
import com.project.trading.model.Withdrawal;
import com.project.trading.service.UserService;
import com.project.trading.service.WalletService;
import com.project.trading.service.WithdrawalService;

@RestController
public class WithdrawalController {

    @Autowired
    private WithdrawalService withdrawalService;

    @Autowired
    private UserService userService;

    @Autowired
    private WalletService walletService;

   @PostMapping("/api/withdrawal/{amount}")
   public ResponseEntity<Withdrawal> withdrawalRequest(@PathVariable("amount") Long amount, @RequestHeader("Authorization") String jwt){
       User user=userService.findUserProfileByJwt(jwt);
       Wallet userWallet=walletService.getUserWallet(user);

       Withdrawal withdrawal=withdrawalService.requestWithdrawal(amount, user);
       walletService.addMoneyToWallet(userWallet, -withdrawal.getAmount());

       walletService.createTransactionRecord(userWallet, WalletTransactionType.WITHDRAWAL, withdrawal.getAmount(), "Bank account withdrawal");

       return new ResponseEntity<>(withdrawal, HttpStatus.OK);
   }

   @PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
   public ResponseEntity<Withdrawal> proceedWithdrawal(@PathVariable Long id, @PathVariable boolean accept, @RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        Wallet userWallet=walletService.getUserWallet(user);
        Withdrawal withdrawal=withdrawalService.proceedWithdrawal(id, accept);
       if(!accept){
        walletService.addMoneyToWallet(userWallet, withdrawal.getAmount());
       }

       return new ResponseEntity<>(withdrawal, HttpStatus.OK);
   }

   @GetMapping("/api/withdrawal/history")
   public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(@RequestHeader("Authorization") String jwt){
    User user=userService.findUserProfileByJwt(jwt);
    List<Withdrawal> withdrawalHistory=withdrawalService.getUsersWithdrawalHistory(user);
    return new ResponseEntity<List<Withdrawal>>(withdrawalHistory, HttpStatus.OK);
   }

   @GetMapping("/api/admin/withdrawal")
   public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequests(@RequestHeader("Authorization") String jwt){
    User user=userService.findUserProfileByJwt(jwt);
    List<Withdrawal> withdrawalRequests=withdrawalService.getAllWithdrawalRequests();
    return new ResponseEntity<List<Withdrawal>>(withdrawalRequests, HttpStatus.OK);
   }



    
    

}
