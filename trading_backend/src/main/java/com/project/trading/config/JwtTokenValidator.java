package com.project.trading.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String jwt=request.getHeader(JWTConstants.HEADER);
		
		if(jwt!=null && jwt.startsWith("Bearer ")) {
			jwt = jwt.substring(7);
			
			try {
				SecretKey key=Keys.hmacShaKeyFor(JWTConstants.SECRET_KEY.getBytes());
				Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
				String email = String.valueOf(claims.get("email"));
				String authorities = String.valueOf(claims.get("authorities"));
				
				// Handle null or empty authorities
				List<GrantedAuthority> authoritiesList;
				if(authorities != null && !authorities.equals("null") && !authorities.isEmpty()) {
					authoritiesList = AuthorityUtils.createAuthorityList(authorities.split(","));
				} else {
					authoritiesList = AuthorityUtils.createAuthorityList("ROLE_CUSTOMER");
				}
				
				UsernamePasswordAuthenticationToken auth=new UsernamePasswordAuthenticationToken(email, null, authoritiesList);
				SecurityContextHolder.getContext().setAuthentication(auth);
				
			}catch(Exception e) {
				System.err.println("JWT Validation Error: " + e.getMessage());
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
				response.getWriter().write("Invalid or expired JWT token");
				return;
			}
		}
		filterChain.doFilter(request, response);
	}

	
}
