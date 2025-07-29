package com.project.trading.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.WatchList;

@Repository
public interface WatchListRepo extends JpaRepository<WatchList, Long> {
    WatchList findByUserId(Long userId);
}
