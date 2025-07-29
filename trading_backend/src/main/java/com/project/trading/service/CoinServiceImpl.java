package com.project.trading.service;


import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.trading.model.Coins;
import com.project.trading.repository.CoinsRepo;

@Service
public class CoinServiceImpl implements CoinService {

    @Autowired
    private CoinsRepo coinsRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public Coins findCoinById(String coinId) {
        Optional<Coins> coin=coinsRepo.findById(coinId);
        return coin.orElse(null);
    }

    @Override
    public List<Coins> getAllCoinsList(int page) {
        String url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page="+page;
        RestTemplate restTemplate=new RestTemplate();
        try{
            HttpHeaders headers=new HttpHeaders();
            HttpEntity<String> entity=new HttpEntity<>(null, headers);
            ResponseEntity<String> response=restTemplate.exchange(url,HttpMethod.GET,entity,String.class);
            List<Coins> coins=objectMapper.readValue(response.getBody(),new TypeReference<List<Coins>>(){});
            return coins;
        }catch(HttpServerErrorException | HttpClientErrorException e){
            throw new RuntimeException("Error fetching coins: " + e.getMessage());
        }catch(Exception e){
            throw new RuntimeException("Error processing response: " + e.getMessage());
        }
    }

    @Override
    public String getCoinDetails(String coinId) {
        String url="https://api.coingecko.com/api/v3/coins/"+coinId;
        RestTemplate restTemplate=new RestTemplate();
        try{
            HttpHeaders headers=new HttpHeaders();
            HttpEntity<String> entity=new HttpEntity<>(null, headers);
            ResponseEntity<String> response=restTemplate.exchange(url,HttpMethod.GET,entity,String.class);
            JsonNode node=objectMapper.readTree(response.getBody());
            Coins coin=new Coins();
            coin.setId(node.get("id").asText());
            coin.setSymbol(node.get("symbol").asText());
            coin.setName(node.get("name").asText());
            coin.setImage(node.get("image").get("large").asText());

            JsonNode marketData=node.get("market_data");
            coin.setCurrentPrice(marketData.get("current_price").get("usd").asDouble());
            coin.setMarketCap(marketData.get("market_cap").get("usd").asLong());
            coin.setMarketCapRank(marketData.get("market_cap_rank").asInt());
            coin.setTotalVolume(marketData.get("total_volume").get("usd").asLong());
            coin.setHigh24h(marketData.get("high_24h").get("usd").asDouble());
            coin.setLow24h(marketData.get("low_24h").get("usd").asDouble());
            coin.setPriceChange24h(marketData.get("price_change_24h").asDouble());
            coin.setPriceChangePercentage24h(marketData.get("price_change_percentage_24h").asDouble());
            coin.setMarketCapChange24h(marketData.get("market_cap_change_24h").asLong());
            coin.setMarketCapChangePercentage24h(marketData.get("market_cap_change_percentage_24h").asDouble());

            coin.setTotalSupply(marketData.get("total_supply").asLong());

            coinsRepo.save(coin);

            return response.getBody();

        }catch(HttpServerErrorException | HttpClientErrorException e){
            throw new RuntimeException("Error fetching coins: " + e.getMessage());
        }catch(Exception e){
            throw new RuntimeException("Error processing response: " + e.getMessage());
        }
    }

    @Override
    public String getMarketChart(String coinId, int days) {
        String url="https://api.coingecko.com/api/v3/coins/"+coinId +"/market_chart?vs_currency=usd&days="+days;
        RestTemplate restTemplate=new RestTemplate();
        try{
            HttpHeaders headers=new HttpHeaders();
            HttpEntity<String> entity=new HttpEntity<>(null, headers);
            ResponseEntity<String> response=restTemplate.exchange(url,HttpMethod.GET,entity,String.class);
            return response.getBody();
        }catch(HttpServerErrorException | HttpClientErrorException e){
            throw new RuntimeException("Error fetching coins: " + e.getMessage());
        }catch(Exception e){
            throw new RuntimeException("Error processing response: " + e.getMessage());
        }
    }

    @Override
    public String getTop50CoinsByMarketCapRank() {
        String url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";
        RestTemplate restTemplate=new RestTemplate();
        try{
            HttpHeaders headers=new HttpHeaders();
            HttpEntity<String> entity=new HttpEntity<>(null, headers);
            ResponseEntity<String> response=restTemplate.exchange(url,HttpMethod.GET,entity,String.class);
            return response.getBody();
        }catch(HttpServerErrorException | HttpClientErrorException e){
            throw new RuntimeException("Error fetching coins: " + e.getMessage());
        }catch(Exception e){
            throw new RuntimeException("Error processing response: " + e.getMessage());
        }
    }

    @Override
    public String searchCoin(String keyword) {
        String url="https://api.coingecko.com/api/v3/search?query="+keyword;
        RestTemplate restTemplate=new RestTemplate();
        try{
            HttpHeaders headers=new HttpHeaders();
            HttpEntity<String> entity=new HttpEntity<>(null, headers);
            ResponseEntity<String> response=restTemplate.exchange(url,HttpMethod.GET,entity,String.class);
            return response.getBody();
        }catch(HttpServerErrorException | HttpClientErrorException e){
            throw new RuntimeException("Error fetching coins: " + e.getMessage());
        }catch(Exception e){
            throw new RuntimeException("Error processing response: " + e.getMessage());
        }
    }

    @Override
    public String getTrendingCoins() {
        String url="https://api.coingecko.com/api/v3/search/trending";
        RestTemplate restTemplate=new RestTemplate();
        try{
            HttpHeaders headers=new HttpHeaders();
            HttpEntity<String> entity=new HttpEntity<>(null, headers);
            ResponseEntity<String> response=restTemplate.exchange(url,HttpMethod.GET,entity,String.class);
            return response.getBody();
        }catch(HttpServerErrorException | HttpClientErrorException e){
            throw new RuntimeException("Error fetching coins: " + e.getMessage());
        }catch(Exception e){
            throw new RuntimeException("Error processing response: " + e.getMessage());
        }
    }
    
}
