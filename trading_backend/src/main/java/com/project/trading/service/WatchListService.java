package com.project.trading.service;

import org.springframework.stereotype.Service;

import com.project.trading.model.Coins;
import com.project.trading.model.User;
import com.project.trading.model.WatchList;

@Service
public interface WatchListService {
    
 WatchList getWatchListByUserId(Long userId);
 WatchList createWatchList(User user);
 WatchList findWatchListById(Long id);

 Coins addCoinToWatchList(Coins coin, User user);

}
