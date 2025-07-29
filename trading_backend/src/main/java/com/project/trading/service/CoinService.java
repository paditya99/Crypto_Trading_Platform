package com.project.trading.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.trading.model.Coins;

@Service
public interface CoinService {
    Coins findCoinById(String coinId);
    List<Coins> getAllCoinsList(int page);
    String getCoinDetails(String coinId);
    String getMarketChart(String coinId, int days);
    String getTop50CoinsByMarketCapRank();
    String searchCoin(String keyword);
    String getTrendingCoins();

}
