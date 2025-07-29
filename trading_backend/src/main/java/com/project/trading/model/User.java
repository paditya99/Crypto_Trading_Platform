package com.project.trading.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.trading.domain.UserRoles;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "app_user")
@Data
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String fullname;
	private String email;
	
	@JsonProperty(access=JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	private UserRoles role= UserRoles.CUSTOMER;
	@Embedded
	private TwoFactorAuth twofactorauth= new TwoFactorAuth();
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserRoles getRole() {
		return role;
	}
	public void setRole(UserRoles role) {
		this.role = role;
	}
	public TwoFactorAuth getTwofactorauth() {
		return twofactorauth;
	}
	public void setTwofactorauth(TwoFactorAuth twofactorauth) {
		this.twofactorauth = twofactorauth;
	}
	
	
}
