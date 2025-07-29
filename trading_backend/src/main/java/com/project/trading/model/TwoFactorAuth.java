package com.project.trading.model;

import com.project.trading.domain.VerificationType;

import javax.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class TwoFactorAuth {
	private boolean isEnabled=false;
	private VerificationType sendTo;
	
	public boolean isEnabled() {
		return isEnabled;
	}
	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}
	public VerificationType getSendTo() {
		return sendTo;
	}
	public void setSendTo(VerificationType sendTo) {
		this.sendTo = sendTo;
	}
}
