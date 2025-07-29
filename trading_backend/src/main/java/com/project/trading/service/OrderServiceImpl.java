package com.project.trading.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.model.Asset;
import com.project.trading.model.Coins;
import com.project.trading.model.Order;
import com.project.trading.model.OrderItem;
import com.project.trading.model.OrderStatus;
import com.project.trading.model.OrderType;
import com.project.trading.model.User;
import com.project.trading.repository.OrderItemRepo;
import com.project.trading.repository.OrderRepo;

import javax.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderItemRepo orderItemRepo;

    @Autowired
    private WalletService walletService;

    @Autowired
    private AssetService assetService;

    @Override
    public Order findOrderById(Long orderId) {
        Optional<Order> order=orderRepo.findById(orderId);
        if(order.isPresent()){
            return order.get();
        }
        throw new RuntimeException("Order not found");
    }

    @Override
    public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {
        double unitPrice=orderItem.getCoin().getCurrentPrice();
        double totalPrice=unitPrice * orderItem.getQuantity();

        Order order=new Order();
        order.setUser(user);
        order.setOrderType(orderType);
        order.setOrderItem(orderItem);
        order.setStatus(OrderStatus.PENDING);
        order.setTimestamp(LocalDateTime.now());
        order.setPrice(BigDecimal.valueOf(totalPrice));
        
        return orderRepo.save(order);
    }

    @Override
    public List<Order> getAllOrdersList(Long userId) {
        return orderRepo.findByUserId(userId);
    }

    public OrderItem createOrderItem(Coins coin, double quantity, double buyprice, double sellprice){
        OrderItem orderItem=new OrderItem();
        orderItem.setCoin(coin);
        orderItem.setQuantity(quantity);
        orderItem.setBuyprice(buyprice);
        orderItem.setSellprice(sellprice);

        return orderItemRepo.save(orderItem);
    }

    @Transactional
    public Order buyAsset(Coins coin, double quantity, User user){
        if(quantity<=0){
            throw new RuntimeException("Quantity must be greater than 0");
        }
        double buyprice = coin.getCurrentPrice();
        OrderItem orderItem=createOrderItem(coin, quantity, buyprice, 0);
        Order order=createOrder(user, orderItem, OrderType.BUY);
        orderItem.setOrder(order);

        walletService.payOrderPayment(order, user);

        order.setStatus(OrderStatus.SUCCESS);
        order.setOrderType(OrderType.BUY);
        orderItemRepo.save(orderItem);

        Order savedOrder=orderRepo.save(order);

        // Create Asset
        //to check if we can directly give (coin,quantity,user) in arguments

        Asset oldAsset=assetService.getAssetByUserIdAndCoinId(order.getUser().getId(), order.getOrderItem().getCoin().getId());
        if(oldAsset==null){
            assetService.createAsset(orderItem.getCoin(), orderItem.getQuantity(), user);
        }
        else{
            assetService.updateAsset(oldAsset.getId(), quantity);
        }

        return savedOrder;
    }

    @Transactional
    public Order sellAsset(Coins coin, double quantity, User user){
        if(quantity<=0){
            throw new RuntimeException("Quantity must be greater than 0");
        }
        double sellprice = coin.getCurrentPrice();

        Asset assetToSell=assetService.getAssetByUserIdAndCoinId(user.getId(), coin.getId());
        if(assetToSell!=null){
            double buyprice = assetToSell.getBuyprice();
            OrderItem orderItem=createOrderItem(coin, quantity, buyprice, sellprice);
            Order order=createOrder(user, orderItem, OrderType.SELL);
            orderItem.setOrder(order);

            if(assetToSell.getQuantity()>=quantity){

                order.setStatus(OrderStatus.SUCCESS);
                order.setOrderType(OrderType.SELL);
                orderItemRepo.save(orderItem);

                Order savedOrder=orderRepo.save(order);

                walletService.payOrderPayment(order, user);
                // Update Asset
                Asset asset=assetService.updateAsset(assetToSell.getId(), -quantity);
                if(asset.getQuantity()==0){
                    assetService.deleteAsset(asset.getId());
                }
                return savedOrder;

            }

            throw new RuntimeException("Insufficient quantity");

    }
    throw new RuntimeException("Asset not found");

    }

    @Override
    public Order processOrder(Coins coin, double quantity, OrderType orderType, User user) {
        if(orderType.equals(OrderType.BUY)){
            return buyAsset(coin, quantity, user);
        }
        else if(orderType.equals(OrderType.SELL)){
            return sellAsset(coin, quantity, user);
        }
        throw new RuntimeException("Invalid order type");
    }
}
