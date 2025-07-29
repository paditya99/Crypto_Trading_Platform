package com.project.trading.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.WalletTransaction;

@Repository
public interface WalletTransactionRepo extends JpaRepository<WalletTransaction, Long>{
    List<WalletTransaction> findByWalletIdOrderByTransactionDateDesc(Long walletId);
} 
