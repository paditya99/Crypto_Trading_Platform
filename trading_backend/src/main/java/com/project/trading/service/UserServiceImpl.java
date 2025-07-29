package com.project.trading.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.config.JwtProvider;
import com.project.trading.domain.VerificationType;
import com.project.trading.model.TwoFactorAuth;
import com.project.trading.model.User;
import com.project.trading.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByEmail(String email) {
        User user=userRepo.findByEmail(email);
        if(user==null){
            throw new RuntimeException("User not found");
        }
        return user;
    }

    @Override
    public User findUserById(Long id) {
        Optional<User> user=userRepo.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new RuntimeException("User not found");
    }

    @Override
    public User findUserProfileByJwt(String jwt) {
        String email=jwtProvider.getEmailFromToken(jwt);
        User user=userRepo.findByEmail(email);
        if(user==null){
            throw new RuntimeException("User not found");
        }
        return user;
    }

 

    @Override
    public User updatePassword(User user, String newPassword) {
        user.setPassword(newPassword);
        return userRepo.save(user);
    }

    //additional method for Two Factor Authentication enable to true
    @Override
    public User enableTwoFactorAuth(VerificationType type, String sendTo, User user) {
       TwoFactorAuth twoFactorAuth=new TwoFactorAuth();
       twoFactorAuth.setEnabled(true);
       twoFactorAuth.setSendTo(type);
       user.setTwofactorauth(twoFactorAuth);

       return userRepo.save(user);

    }

    @Override
    public User disableTwoFactorAuth(User user) {
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Check if 2FA is currently enabled
        if (user.getTwofactorauth() == null || !user.getTwofactorauth().isEnabled()) {
            throw new RuntimeException("Two Factor Authentication is not enabled");
        }

        // Disable 2FA
            user.getTwofactorauth().setEnabled(false);
            User updatedUser = userRepo.save(user);
            
            return updatedUser;
    }
    
}
