package com.project.trading.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.trading.model.Coins;
import com.project.trading.model.User;
import com.project.trading.model.WatchList;
import com.project.trading.service.CoinService;
import com.project.trading.service.UserService;
import com.project.trading.service.WatchListService;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {

    @Autowired
    private WatchListService watchListService;

    @Autowired
    private CoinService coinService;

    @Autowired
    private UserService userService;
    
    @GetMapping("/user")
    public ResponseEntity<WatchList> getWatchListByUserId(@RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        WatchList watchList=watchListService.getWatchListByUserId(user.getId());
        return ResponseEntity.ok(watchList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WatchList> getWatchListById(@PathVariable("id") Long id){
        WatchList watchList=watchListService.findWatchListById(id);
        return ResponseEntity.ok(watchList);
    }

    @PostMapping("/add/coin/{coinId}")
    public ResponseEntity<Coins> addCoinToWatchList(@PathVariable("coinId") String coinId, @RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        Coins coin=coinService.findCoinById(coinId);
        Coins addedCoin=watchListService.addCoinToWatchList(coin, user);
        return ResponseEntity.ok(addedCoin);
    }

}
