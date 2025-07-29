package com.project.trading.service;

import org.springframework.stereotype.Service;

import com.project.trading.domain.VerificationType;
import com.project.trading.model.User;

@Service
public interface UserService {
    public User findUserByEmail(String email);
    public User findUserById(Long id);
    public User findUserProfileByJwt(String jwt);
    public User enableTwoFactorAuth(VerificationType type, String sendTo, User user );
    public User updatePassword(User user, String newPassword);
    public User disableTwoFactorAuth(User user);
}
