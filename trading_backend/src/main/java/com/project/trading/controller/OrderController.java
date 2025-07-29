package com.project.trading.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.trading.model.Coins;
import com.project.trading.model.Order;
import com.project.trading.model.OrderType;
import com.project.trading.model.User;
import com.project.trading.model.Wallet;
import com.project.trading.request.CreateOrderRequest;
import com.project.trading.service.CoinService;
import com.project.trading.service.OrderService;
import com.project.trading.service.UserService;
import com.project.trading.service.WalletService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CoinService coinService;

    @Autowired
    private UserService userService;

    @Autowired
    private WalletService walletService;

    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(@RequestHeader("Authorization") String jwt, @RequestBody CreateOrderRequest req){
        User user=userService.findUserProfileByJwt(jwt);
        Coins coin=coinService.findCoinById(req.getCoinId());

        Order order=orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);

        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@RequestHeader("Authorization") String jwt, @PathVariable("orderId") Long orderId){
        User user=userService.findUserProfileByJwt(jwt);
        Order order=orderService.findOrderById(orderId);

        if(order.getUser().getId().equals(user.getId())){
            return ResponseEntity.ok(order);
        }
        else{
            throw new RuntimeException("You are not authorized to view this order");
        }
    }

    @GetMapping("/allOrders")
    public ResponseEntity<List<Order>> getAllUserOrders(@RequestHeader("Authorization") String jwt){

            User user=userService.findUserProfileByJwt(jwt);
            List<Order> orders=orderService.getAllOrdersList(user.getId());

            return ResponseEntity.ok(orders);
    }



    
}
