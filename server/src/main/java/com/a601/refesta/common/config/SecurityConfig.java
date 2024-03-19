package com.a601.refesta.common.config;

import com.a601.refesta.common.jwt.JwtAccessDeniedHandler;
import com.a601.refesta.common.jwt.JwtAuthenticationEntryPoint;
import com.a601.refesta.common.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    private final JwtFilter jwtFilter;



}
