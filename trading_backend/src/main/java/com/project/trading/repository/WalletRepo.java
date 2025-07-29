package com.project.trading.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.Wallet;

@Repository
public interface WalletRepo extends JpaRepository<Wallet, Long>{
    List<Wallet> findByUserId(Long userId);
    Optional<Wallet> findFirstByUserId(Long userId);
}
