package com.project.trading.response;

import lombok.Data;

@Data
public class AuthResponse {
	private String jwt;
	private boolean status;
	private String message;
	private boolean isTwoFactorAuthEnabled;
	private String session;
	private String otp; // For development - OTP to display on frontend
	
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isTwoFactorAuthEnabled() {
		return isTwoFactorAuthEnabled;
	}
	public void setTwoFactorAuthEnabled(boolean isTwoFactorAuthEnabled) {
		this.isTwoFactorAuthEnabled = isTwoFactorAuthEnabled;
	}
	public String getSession() {
		return session;
	}
	public void setSession(String session) {
		this.session = session;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
}
