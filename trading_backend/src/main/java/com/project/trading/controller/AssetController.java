package com.project.trading.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.trading.model.Asset;
import com.project.trading.model.User;
import com.project.trading.service.AssetService;
import com.project.trading.service.CoinService;
import com.project.trading.service.UserService;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    @Autowired
    private AssetService assetService;

    @Autowired
    private CoinService coinsService;

    @Autowired
    private UserService userService;

    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable("assetId") Long assetId){
        Asset asset=assetService.getAssetById(assetId);
        return new ResponseEntity<Asset>(asset, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Asset>> getAllUserAssets(@RequestHeader("Authorization") String jwt){
        User user=userService.findUserProfileByJwt(jwt);
        List<Asset> assets= assetService.getAllUserAssets(user.getId());
        return ResponseEntity.ok(assets);
    }

    @GetMapping("/coin/{coinId}")
    public ResponseEntity<Asset> getAssetByUserIdAndCoinId(@RequestHeader("Authorization") String jwt, @PathVariable("coinId") String coinId){
        User user=userService.findUserProfileByJwt(jwt);
        Asset asset= assetService.getAssetByUserIdAndCoinId(user.getId(), coinId);
        return ResponseEntity.ok(asset);
    }



}
