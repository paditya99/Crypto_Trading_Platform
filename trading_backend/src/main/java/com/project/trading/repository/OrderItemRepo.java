package com.project.trading.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.OrderItem;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem, Long>{
    
}
