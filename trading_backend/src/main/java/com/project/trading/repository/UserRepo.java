package com.project.trading.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.trading.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
		User findByEmail(String email);
}
