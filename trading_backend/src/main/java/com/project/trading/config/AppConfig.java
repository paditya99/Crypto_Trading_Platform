package com.project.trading.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;

@Configuration
public class AppConfig {
	
	@Value("${app.cors.allowed-origins}")
	private String corsAllowedOrigins;
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		http
			.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeRequests(authorize -> authorize.antMatchers("/api/**").authenticated().anyRequest().permitAll())
			.addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
			.csrf(csrf->csrf.disable())
			.cors(cors->cors.configurationSource(corsConfigurationSource()));
			
			return http.build();
	}

	private CorsConfigurationSource corsConfigurationSource() {
			return new CorsConfigurationSource() {
				
				@Override
				public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
					CorsConfiguration cfg=new CorsConfiguration();
					cfg.setAllowedOrigins(
						Arrays.asList(corsAllowedOrigins.split(","))
					);
					cfg.setAllowedMethods(Collections.singletonList("*"));
					cfg.setAllowCredentials(true);
					cfg.setExposedHeaders(Arrays.asList("Authorization"));
					cfg.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
					cfg.setMaxAge(3600L);
					return cfg;
					
				}
			};
	}

	
}
