package com.project.trading.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Coins {
    @Id
    @JsonProperty("id")
    private String id;
    @JsonProperty("symbol")
    private String symbol;
    @JsonProperty("name")
    private String name;
    @JsonProperty("image")
    private String image;

    @JsonProperty("current_price")
    private double currentPrice;

    @JsonProperty("market_cap")
    private long marketCap;

    @JsonProperty("market_cap_rank")
    private int marketCapRank;

    @JsonProperty("fully_diluted_valuation")
    private Long fullyDilutedValuation;

    @JsonProperty("total_volume")
    private long totalVolume;

    @JsonProperty("high_24h")
    private double high24h;

    @JsonProperty("low_24h")
    private double low24h;

    @JsonProperty("price_change_24h")
    private double priceChange24h;

    @JsonProperty("price_change_percentage_24h")
    private double priceChangePercentage24h;

    @JsonProperty("market_cap_change_24h")
    private double marketCapChange24h;

    @JsonProperty("market_cap_change_percentage_24h")
    private double marketCapChangePercentage24h;

    @JsonProperty("circulating_supply")
    private double circulatingSupply;

    @JsonProperty("total_supply")
    private double totalSupply;

    @JsonProperty("max_supply")
    private Double maxSupply;

    private double ath;

    @JsonProperty("ath_change_percentage")
    private double athChangePercentage;

    @JsonProperty("ath_date")
    private String athDate;

    private double atl;

    @JsonProperty("atl_change_percentage")
    private double atlChangePercentage;

    @JsonProperty("atl_date")
    private String atlDate;

    @javax.persistence.Embedded
    private Roi roi;

    @JsonProperty("last_updated")
    private String lastUpdated;

    // Getters and setters omitted for brevity

    @javax.persistence.Embeddable
    public static class Roi {
        private double times;
        private String currency;
        private double percentage;

        // Getters and setters
        public double getTimes() { return times; }
        public void setTimes(double times) { this.times = times; }

        public String getCurrency() { return currency; }
        public void setCurrency(String currency) { this.currency = currency; }

        public double getPercentage() { return percentage; }
        public void setPercentage(double percentage) { this.percentage = percentage; }
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public double getCurrentPrice() {
		return currentPrice;
	}

	public void setCurrentPrice(double currentPrice) {
		this.currentPrice = currentPrice;
	}

	public long getMarketCap() {
		return marketCap;
	}

	public void setMarketCap(long marketCap) {
		this.marketCap = marketCap;
	}

	public int getMarketCapRank() {
		return marketCapRank;
	}

	public void setMarketCapRank(int marketCapRank) {
		this.marketCapRank = marketCapRank;
	}

	public Long getFullyDilutedValuation() {
		return fullyDilutedValuation;
	}

	public void setFullyDilutedValuation(Long fullyDilutedValuation) {
		this.fullyDilutedValuation = fullyDilutedValuation;
	}

	public long getTotalVolume() {
		return totalVolume;
	}

	public void setTotalVolume(long totalVolume) {
		this.totalVolume = totalVolume;
	}

	public double getHigh24h() {
		return high24h;
	}

	public void setHigh24h(double high24h) {
		this.high24h = high24h;
	}

	public double getLow24h() {
		return low24h;
	}

	public void setLow24h(double low24h) {
		this.low24h = low24h;
	}

	public double getPriceChange24h() {
		return priceChange24h;
	}

	public void setPriceChange24h(double priceChange24h) {
		this.priceChange24h = priceChange24h;
	}

	public double getPriceChangePercentage24h() {
		return priceChangePercentage24h;
	}

	public void setPriceChangePercentage24h(double priceChangePercentage24h) {
		this.priceChangePercentage24h = priceChangePercentage24h;
	}

	public double getMarketCapChange24h() {
		return marketCapChange24h;
	}

	public void setMarketCapChange24h(double marketCapChange24h) {
		this.marketCapChange24h = marketCapChange24h;
	}

	public double getMarketCapChangePercentage24h() {
		return marketCapChangePercentage24h;
	}

	public void setMarketCapChangePercentage24h(double marketCapChangePercentage24h) {
		this.marketCapChangePercentage24h = marketCapChangePercentage24h;
	}

	public double getCirculatingSupply() {
		return circulatingSupply;
	}

	public void setCirculatingSupply(double circulatingSupply) {
		this.circulatingSupply = circulatingSupply;
	}

	public double getTotalSupply() {
		return totalSupply;
	}

	public void setTotalSupply(double totalSupply) {
		this.totalSupply = totalSupply;
	}

	public Double getMaxSupply() {
		return maxSupply;
	}

	public void setMaxSupply(Double maxSupply) {
		this.maxSupply = maxSupply;
	}

	public double getAth() {
		return ath;
	}

	public void setAth(double ath) {
		this.ath = ath;
	}

	public double getAthChangePercentage() {
		return athChangePercentage;
	}

	public void setAthChangePercentage(double athChangePercentage) {
		this.athChangePercentage = athChangePercentage;
	}

	public String getAthDate() {
		return athDate;
	}

	public void setAthDate(String athDate) {
		this.athDate = athDate;
	}

	public double getAtl() {
		return atl;
	}

	public void setAtl(double atl) {
		this.atl = atl;
	}

	public double getAtlChangePercentage() {
		return atlChangePercentage;
	}

	public void setAtlChangePercentage(double atlChangePercentage) {
		this.atlChangePercentage = atlChangePercentage;
	}

	public String getAtlDate() {
		return atlDate;
	}

	public void setAtlDate(String atlDate) {
		this.atlDate = atlDate;
	}

	public Roi getRoi() {
		return roi;
	}

	public void setRoi(Roi roi) {
		this.roi = roi;
	}

	public String getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(String lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

    // Add standard getters and setters or use Lombok if preferred
}
