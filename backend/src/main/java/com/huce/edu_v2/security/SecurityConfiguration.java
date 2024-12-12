package com.huce.edu_v2.security;

import com.huce.edu_v2.util.constant.PredefinedRole;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {
    private static final String[] PUBLIC_ENDPOINTS = {
            "/users/forgotPassword",
            "/users/fetchUserById",
            "/auth/**",
            "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui/index.html#/",
            "/redis/**",
            "/ws/**",
//            "/infoChat/**",
            "/storage/**",
            "/chat/**",
    };

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("*"));
        configuration.setAllowedMethods(Collections.singletonList("*"));
        configuration.setAllowedHeaders(Collections.singletonList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private final CustomJwtDecoder customJwtDecoder;

    public SecurityConfiguration(CustomJwtDecoder customJwtDecoder) {
        this.customJwtDecoder = customJwtDecoder;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity,
                                           CustomAuthenticationEntryPoint customAuthenticationEntryPoint) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                    .cors(Customizer.withDefaults())
                    .authorizeHttpRequests(request -> request.requestMatchers(PUBLIC_ENDPOINTS)
                        .permitAll()

                            .requestMatchers(HttpMethod.GET, "/words/getWordsByTid", "/topics/getTopicsByLid").hasAuthority(PredefinedRole.ROLE_ADMIN)
                            .requestMatchers(HttpMethod.POST, "/words/add", "/topics/add").hasAuthority(PredefinedRole.ROLE_ADMIN)
                            .requestMatchers(HttpMethod.PUT, "/words/edit", "/topics/edit").hasAuthority(PredefinedRole.ROLE_ADMIN)
                            .requestMatchers(HttpMethod.DELETE, "/words/delete", "/topics/delete").hasAuthority(PredefinedRole.ROLE_ADMIN)

                            .requestMatchers(HttpMethod.GET, "/words/*").permitAll()
                            .requestMatchers(HttpMethod.GET, "/users").hasAuthority(PredefinedRole.ROLE_ADMIN)
                            .requestMatchers(HttpMethod.POST, "/users/create-password").hasAuthority(PredefinedRole.ROLE_USER)
                            .requestMatchers(HttpMethod.DELETE, "/users/*").hasAuthority(PredefinedRole.ROLE_ADMIN)

                            .requestMatchers(HttpMethod.GET, "/levels/getAll", "/topics/getByLevel").hasAuthority(PredefinedRole.ROLE_USER)
                            .requestMatchers(HttpMethod.GET, "/levels/*", "/topics/*").hasAuthority(PredefinedRole.ROLE_ADMIN)
                            .requestMatchers(HttpMethod.POST, "/levels", "/topics").hasAuthority(PredefinedRole.ROLE_ADMIN)
                            .requestMatchers(HttpMethod.PUT, "/levels", "/topics").hasAuthority(PredefinedRole.ROLE_ADMIN)
                            .requestMatchers(HttpMethod.DELETE, "/levels/*", "/topics/*").hasAuthority(PredefinedRole.ROLE_ADMIN)

                            .requestMatchers(HttpMethod.POST, "/upload/*").authenticated()

                            .requestMatchers(HttpMethod.GET, "/infoChat/users/getAllUserIdsAndLatestMessage").hasAuthority(PredefinedRole.ROLE_ADMIN)

                            .requestMatchers(HttpMethod.GET, "/statistics/**").hasAuthority(PredefinedRole.ROLE_ADMIN)

                            .anyRequest().authenticated())

                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer
                                .decoder(customJwtDecoder)
                                .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                        .authenticationEntryPoint(customAuthenticationEntryPoint));

        return httpSecurity.build();
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
//        grantedAuthoritiesConverter.setAuthoritiesClaimName("permission");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }
}
