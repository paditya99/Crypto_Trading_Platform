package com.project.trading.request;

import com.project.trading.model.OrderType;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private String coinId;
    private OrderType orderType;
    private double quantity;
	public String getCoinId() {
		return coinId;
	}
	public void setCoinId(String coinId) {
		this.coinId = coinId;
	}
	public OrderType getOrderType() {
		return orderType;
	}
	public void setOrderType(OrderType orderType) {
		this.orderType = orderType;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
}
