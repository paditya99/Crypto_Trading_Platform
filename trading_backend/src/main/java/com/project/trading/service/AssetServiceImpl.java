package com.project.trading.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.trading.model.Asset;
import com.project.trading.model.Coins;
import com.project.trading.model.User;
import com.project.trading.repository.AssetRepo;

@Service
public class AssetServiceImpl implements AssetService{

    @Autowired
    private AssetRepo assetRepo;

    @Override
    public List<Asset> getAllUserAssets(Long userId) {
        return assetRepo.findByUserId(userId);
    }

    @Override
    public Asset createAsset(Coins coin, double quantity, User user) {
        Asset asset=new Asset();
        asset.setCoin(coin);
        asset.setQuantity(quantity);
        asset.setUser(user);
        asset.setBuyprice(coin.getCurrentPrice());

        return assetRepo.save(asset);
    }

    @Override
    public Asset updateAsset(Long assetId, double quantity) {
        Asset oldAsset=getAssetById(assetId);
        oldAsset.setQuantity(quantity);
        return assetRepo.save(oldAsset);
    }

    @Override
    public Asset deleteAsset(Long assetId) {
         Asset asset = getAssetById(assetId);
         assetRepo.deleteById(assetId);
         return asset;
    }

    @Override
    public Asset getAssetById(Long assetId) {
        Optional<Asset> asset=assetRepo.findById(assetId);
        if(asset.isPresent()){
            return asset.get();
        }
        throw new RuntimeException("Asset not found");
    }

    @Override
    public Asset getAssetByUserIdAndCoinId(Long userId, String coinId) {
        return assetRepo.findByUserIdAndCoinId(userId, coinId);
    }

    @Override
    public Asset getAssetByUserIdAndId(Long userId, Long assetId) {
       return null;
    }
    
}
