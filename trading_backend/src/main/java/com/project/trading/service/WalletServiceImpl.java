package com.project.trading.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.domain.WalletTransactionType;

import com.project.trading.model.Order;
import com.project.trading.model.OrderType;
import com.project.trading.model.User;
import com.project.trading.model.Wallet;
import com.project.trading.model.WalletTransaction;
import com.project.trading.repository.WalletRepo;
import com.project.trading.repository.WalletTransactionRepo;

@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepo walletRepo;

    @Autowired
    private WalletTransactionRepo walletTransactionRepo;

    @Override
    public Wallet getUserWallet(User user) {
        // Get the first wallet for the user
        Optional<Wallet> walletOpt = walletRepo.findFirstByUserId(user.getId());
        
        if(walletOpt.isPresent()) {
            return walletOpt.get();
        } else {
            // Create new wallet if none exists
            Wallet wallet = new Wallet();
            wallet.setUser(user);
            wallet.setBalance(BigDecimal.ZERO);
            return walletRepo.save(wallet);
        }
    }

    @Override
    public Wallet findWalletById(Long id) {
        Optional<Wallet> wallet = walletRepo.findById(id);
        if(wallet.isPresent()){
            return wallet.get();
        }
        throw new RuntimeException("Wallet not found");
    }

    @Override
    public Wallet walletToWalletTransfer(User sender, Wallet receiver, Long amount) {
        Optional<Wallet> senderWalletOpt = walletRepo.findFirstByUserId(sender.getId());
        if(!senderWalletOpt.isPresent()) {
            throw new RuntimeException("Sender wallet not found");
        }
        Wallet senderWallet = senderWalletOpt.get();
        
        BigDecimal senderWalletBalance = senderWallet.getBalance();
        if(senderWalletBalance.compareTo(BigDecimal.valueOf(amount)) < 0){
            throw new RuntimeException("Insufficient balance");
        }
        BigDecimal newSenderBalance = senderWallet.getBalance().subtract(BigDecimal.valueOf(amount));
        BigDecimal newReceiverBalance = receiver.getBalance().add(BigDecimal.valueOf(amount));

        senderWallet.setBalance(newSenderBalance);
        receiver.setBalance(newReceiverBalance);

        walletRepo.save(senderWallet);
        walletRepo.save(receiver);

        // Create transaction records
        createTransactionRecord(senderWallet, WalletTransactionType.WALLET_TRANSFER, -amount, "Transfer to wallet ID: " + receiver.getId());
        createTransactionRecord(receiver, WalletTransactionType.WALLET_TRANSFER, amount, "Transfer from wallet ID: " + senderWallet.getId());

        return senderWallet; 
    }

    @Override
    public Wallet addMoneyToWallet(Wallet wallet, Long amount) {
        BigDecimal walletBalance = wallet.getBalance();
        BigDecimal newBalance = walletBalance.add(BigDecimal.valueOf(amount));

        // If amount is negative (i.e., withdrawal), check for sufficient funds
        if (amount < 0 && walletBalance.compareTo(BigDecimal.valueOf(-amount)) < 0) {
            throw new RuntimeException("Insufficient balance for withdrawal");
        }

        wallet.setBalance(newBalance);
        Wallet savedWallet = walletRepo.save(wallet);

        // Create transaction record
        createTransactionRecord(savedWallet, WalletTransactionType.ADD_MONEY, amount, "Money added to wallet");

        return savedWallet;
    }

    @Override
    public Wallet payOrderPayment(Order order, User user) {
        Optional<Wallet> walletOpt = walletRepo.findFirstByUserId(user.getId());
        if(!walletOpt.isPresent()) {
            throw new RuntimeException("User wallet not found");
        }
        Wallet wallet = walletOpt.get();
        
        if(order.getOrderType()==OrderType.BUY){
            BigDecimal orderPrice=order.getPrice();
            BigDecimal walletBalance=wallet.getBalance();
            if(walletBalance.compareTo(orderPrice)<0){
                throw new RuntimeException("Insufficient balance");
            }
            BigDecimal newBalance=walletBalance.subtract(orderPrice);
            wallet.setBalance(newBalance);
            
            // Create transaction record for buy order
            createTransactionRecord(wallet, WalletTransactionType.BUY_ASSET, -orderPrice.longValue(), 
                "Buy order - " + order.getOrderItem().getCoin().getName());
        }
        else{
            BigDecimal orderPrice=order.getPrice();
            BigDecimal walletBalance=wallet.getBalance();
            BigDecimal newBalance=walletBalance.add(orderPrice);
            wallet.setBalance(newBalance);
            
            // Create transaction record for sell order
            createTransactionRecord(wallet, WalletTransactionType.SELL_ASSET, orderPrice.longValue(), 
                "Sell order - " + order.getOrderItem().getCoin().getName());
        }
        walletRepo.save(wallet);
        return wallet;
    }

    @Override
    public List<WalletTransaction> getUserWalletTransactions(Wallet wallet) {
        return walletTransactionRepo.findByWalletIdOrderByTransactionDateDesc(wallet.getId());
    }

    @Override
    public void createTransactionRecord(Wallet wallet, WalletTransactionType transactionType, Long amount, String purpose) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setTransactionType(transactionType);
        transaction.setAmount(amount);
        transaction.setPurpose(purpose);
        transaction.setTransactionDate(LocalDate.now());
        walletTransactionRepo.save(transaction);
    }

    @Override
    public void cleanupDuplicateWallets(Long userId) {
        List<Wallet> wallets = walletRepo.findByUserId(userId);
        if(wallets.size() > 1) {
            // Keep the first wallet, delete the rest
            for(int i = 1; i < wallets.size(); i++) {
                try {
                    walletRepo.delete(wallets.get(i));
                } catch (Exception e) {
                    System.out.println("Warning: Could not delete duplicate wallet " + wallets.get(i).getId());
                }
            }
        }
    }
}
