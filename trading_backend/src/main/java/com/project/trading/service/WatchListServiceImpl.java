package com.project.trading.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.model.Coins;
import com.project.trading.model.User;
import com.project.trading.model.WatchList;
import com.project.trading.repository.WatchListRepo;

@Service
public class WatchListServiceImpl implements WatchListService {

    @Autowired
    private WatchListRepo watchListRepo;

    @Override
    public WatchList getWatchListByUserId(Long userId) {
        WatchList watchList=watchListRepo.findByUserId(userId);
        if(watchList==null){
            throw new RuntimeException("Watchlist not found");
        }
        return watchList;
    }

    @Override
    public WatchList createWatchList(User user) {
        WatchList watchList=new WatchList();
        watchList.setUser(user);
        watchListRepo.save(watchList);
        return watchList;
    }

    @Override
    public WatchList findWatchListById(Long id) {
        Optional<WatchList> watchList=watchListRepo.findById(id);
        if(watchList.isPresent()){
            return watchList.get();
        }
        throw new RuntimeException("Watchlist not found");
    }

    @Override
    public Coins addCoinToWatchList(Coins coin, User user) {
        WatchList watchList=getWatchListByUserId(user.getId());
        if(watchList.getCoins().contains(coin)){
            watchList.getCoins().remove(coin);
        }
        else{
            watchList.getCoins().add(coin);
        }
        
        watchListRepo.save(watchList);
        return coin;
    }
    
}
