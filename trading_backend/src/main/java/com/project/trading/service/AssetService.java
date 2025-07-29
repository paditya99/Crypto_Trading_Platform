package com.project.trading.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.trading.model.Asset;
import com.project.trading.model.Coins;
import com.project.trading.model.User;

@Service
public interface AssetService {

    List<Asset> getAllUserAssets(Long userId);
    
    Asset createAsset(Coins coin, double quantity, User user);
    Asset updateAsset(Long assetId, double quantity);
    Asset deleteAsset(Long assetId);

    Asset getAssetById(Long assetId);
    Asset getAssetByUserIdAndCoinId(Long userId, String coinId);
    Asset getAssetByUserIdAndId(Long userId, Long assetId);

}
