package com.project.trading.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.trading.domain.WalletTransactionType;
import com.project.trading.model.Order;
import com.project.trading.model.User;
import com.project.trading.model.Wallet;
import com.project.trading.model.WalletTransaction;

@Service
public interface WalletService {
    Wallet getUserWallet(User user);
    Wallet findWalletById(Long id);
    Wallet walletToWalletTransfer(User sender, Wallet receiver, Long amount);
    Wallet addMoneyToWallet(Wallet wallet, Long amount);
    Wallet payOrderPayment(Order order, User user);
    List<WalletTransaction> getUserWalletTransactions(Wallet wallet);
    void createTransactionRecord(Wallet wallet, WalletTransactionType transactionType, Long amount, String purpose);
    void cleanupDuplicateWallets(Long userId);
}
