package com.project.trading.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.trading.model.Coins;
import com.project.trading.service.CoinService;

@RestController
@RequestMapping("/coins")
public class CoinController {

    @Autowired
    private CoinService coinService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<List<Coins>> getAllCoinsList(@RequestParam(required=false,name="page") int page) {
        List<Coins> coins = coinService.getAllCoinsList(page);
        return new ResponseEntity<>(coins, HttpStatus.OK);
    }

    @GetMapping("/{coinId}/chart")
    public ResponseEntity<JsonNode> getCoinsMarketChart(@PathVariable("coinId") String coinId,
            @RequestParam("days") int days) throws Exception {
        String chartData = coinService.getMarketChart(coinId, days);
        JsonNode node = objectMapper.readTree(chartData);

        return new ResponseEntity<>(node, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<JsonNode> searchCoins(@RequestParam("q") String keyword) throws Exception{
        String searchData=coinService.searchCoin(keyword);
        JsonNode node=objectMapper.readTree(searchData);
        return new ResponseEntity<>(node,HttpStatus.OK);
    }

    @GetMapping("/details/{coinId}")
    public ResponseEntity<JsonNode> getCoinDetails(@PathVariable("coinId") String coinId) throws Exception{
        String detailsData=coinService.getCoinDetails(coinId);
        JsonNode node=objectMapper.readTree(detailsData);
        return new ResponseEntity<>(node,HttpStatus.OK);
    }

    @GetMapping("/trending")
    public ResponseEntity<JsonNode> getTrendingCoins() throws Exception{
        String trendingCoinsData=coinService.getTrendingCoins();
        JsonNode node=objectMapper.readTree(trendingCoinsData);
        return new ResponseEntity<>(node,HttpStatus.OK);
    }

    @GetMapping("/top50")
    public ResponseEntity<JsonNode> getTop50Coins() throws Exception{
        String top50CoinsData=coinService.getTop50CoinsByMarketCapRank();
        JsonNode node=objectMapper.readTree(top50CoinsData);
        return new ResponseEntity<>(node,HttpStatus.OK);
    }


    
}
