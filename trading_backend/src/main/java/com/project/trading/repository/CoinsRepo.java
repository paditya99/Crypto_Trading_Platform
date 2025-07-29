package com.project.trading.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.Coins;

@Repository
public interface CoinsRepo extends JpaRepository<Coins, String> {
    // JpaRepository already provides findById(String id) method
}
