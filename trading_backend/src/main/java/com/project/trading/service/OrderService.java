package com.project.trading.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.trading.model.Coins;
import com.project.trading.model.Order;
import com.project.trading.model.OrderItem;
import com.project.trading.model.OrderType;
import com.project.trading.model.User;

@Service
public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);
    Order findOrderById(Long orderId);
    List<Order> getAllOrdersList(Long userId);
    Order processOrder(Coins coin, double quantity, OrderType orderType, User user);
}

