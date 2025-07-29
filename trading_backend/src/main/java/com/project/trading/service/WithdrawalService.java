package com.project.trading.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.trading.model.User;
import com.project.trading.model.Withdrawal;
 

@Service
public interface WithdrawalService {
    Withdrawal requestWithdrawal(Long amount, User user);
    Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept);
    List<Withdrawal> getAllWithdrawalRequests();
    List<Withdrawal> getUsersWithdrawalHistory(User user);
    
}
