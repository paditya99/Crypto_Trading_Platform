package com.project.trading.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.trading.config.JwtProvider;
import com.project.trading.model.TwoFactorOTP;
import com.project.trading.model.User;
import com.project.trading.repository.UserRepo;
import com.project.trading.response.AuthResponse;
import com.project.trading.service.CustomUserDetailsService;
import com.project.trading.service.EmailService;
import com.project.trading.service.TwoFactorOTPService;
import com.project.trading.service.WatchListService;
import com.project.trading.utils.OtpUtils;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepo repo;
	
	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private TwoFactorOTPService twoFactorOTPService;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private WatchListService watchListService;
	
	@PostMapping("/register")
	public ResponseEntity<AuthResponse> registerUser(@RequestBody User user) throws Exception{
		
		User isUserExists = repo.findByEmail(user.getEmail());
		
		if(isUserExists != null) {
			throw new Exception("User already exists");
		}
		
		User newuser=new User();
		newuser.setFullname(user.getFullname());
		newuser.setEmail(user.getEmail());
		newuser.setPassword(user.getPassword());
		
		User saveduser= repo.save(newuser);
		watchListService.createWatchList(saveduser);
		
		Authentication auth = authenticate(user.getEmail(), user.getPassword());
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		String token=jwtProvider.generateToken(auth);
		AuthResponse res=new AuthResponse();
		res.setJwt(token);
		res.setStatus(true);
		res.setMessage("User Registered successfully");
		
		return new ResponseEntity<AuthResponse>(res, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginUser(@RequestBody User user) throws Exception{
		
				String email=user.getEmail();
				String password=user.getPassword();
				
				Authentication auth=authenticate(email, password);
				SecurityContextHolder.getContext().setAuthentication(auth);
				
				String token=jwtProvider.generateToken(auth);
				User authuser=repo.findByEmail(email);
				if(authuser.getTwofactorauth().isEnabled()){
					AuthResponse res=new AuthResponse();
					res.setMessage("Two factor authentication is enabled");
					res.setTwoFactorAuthEnabled(true);
					
					String otp=OtpUtils.generateOtp();
					TwoFactorOTP twoFactorOTP=twoFactorOTPService.findByUser(authuser.getId());
					if(twoFactorOTP != null){
						twoFactorOTPService.deleteTwoFactorOTP(twoFactorOTP);
					}
					TwoFactorOTP newTwoFactorOTP=twoFactorOTPService.createTwoFactorOTP(authuser, token, otp);
					emailService.sendVerificationOtpEmail(email, otp);
					res.setSession(newTwoFactorOTP.getId());
					return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
				}
				AuthResponse res=new AuthResponse();
				res.setJwt(token);
				res.setStatus(true);
				res.setMessage("Login successfully");
				
				return new ResponseEntity<AuthResponse>(res, HttpStatus.CREATED);
	}
		
	private Authentication authenticate(String email, String password) {
		UserDetails userDetails=customUserDetailsService.loadUserByUsername(email);
		if(userDetails==null) {
			throw new BadCredentialsException("Invalid username");
		}
		if(!userDetails.getPassword().equals(password)) {
			throw new BadCredentialsException("Invalid password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
	}

	@PostMapping("two-factor/otp/{otp}")
	public ResponseEntity<AuthResponse> verifySigninOTP(@PathVariable("otp") String otp, @RequestParam("id") String id){
		TwoFactorOTP twoFactorOTP=twoFactorOTPService.findById(id);
		if(twoFactorOTPService.verifyTwoFactorOTP(twoFactorOTP, otp)){
			AuthResponse res=new AuthResponse();
			res.setJwt(twoFactorOTP.getJwt());
			res.setMessage("Two factor authentication successful");
			res.setTwoFactorAuthEnabled(true);
			return new ResponseEntity<AuthResponse>(res, HttpStatus.OK);
		}
		throw new BadCredentialsException("Invalid OTP");
	}
}
