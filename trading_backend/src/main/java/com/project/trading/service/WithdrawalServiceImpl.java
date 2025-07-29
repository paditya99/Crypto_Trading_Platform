package com.project.trading.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.domain.WithdrawalStatus;
import com.project.trading.model.User;
import com.project.trading.model.Withdrawal;
import com.project.trading.repository.WithdrawalRepo;

@Service
public class WithdrawalServiceImpl implements WithdrawalService {

    @Autowired
    private WithdrawalRepo withdrawalRepo;

    @Override
    public Withdrawal requestWithdrawal(Long amount, User user) {
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setAmount(amount);
        withdrawal.setUser(user);
        withdrawal.setStatus(WithdrawalStatus.PENDING);
        return withdrawalRepo.save(withdrawal);
    }

    @Override
    public Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) {
        Withdrawal withdrawal = withdrawalRepo.findById(withdrawalId).orElseThrow(() -> new RuntimeException("Withdrawal not found"));
        if (accept) {
            withdrawal.setStatus(WithdrawalStatus.SUCCESS);
        } else {
            withdrawal.setStatus(WithdrawalStatus.DECLINE);
        }
        return withdrawalRepo.save(withdrawal);
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequests() {
        return withdrawalRepo.findAll();
    }

    @Override
    public List<Withdrawal> getUsersWithdrawalHistory(User user) {
        return withdrawalRepo.findByUserId(user.getId());
    }
    
}
