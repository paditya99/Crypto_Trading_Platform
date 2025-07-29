package com.project.trading.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
	
	@GetMapping("/")
	public String greet() {
		return "Hello Aditya Pathak";
	}
	
	@GetMapping("/api")
	public String greetSecure() {
		return "Hello Aditya Pathak secure";
	}
	
}
