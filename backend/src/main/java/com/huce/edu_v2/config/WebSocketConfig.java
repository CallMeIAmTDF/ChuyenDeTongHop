package com.huce.edu_v2.config;

import com.huce.edu_v2.advice.AppException;
import com.huce.edu_v2.advice.ErrorCode;
import com.huce.edu_v2.util.SecurityUtil;
import com.huce.edu_v2.util.constant.PredefinedRole;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.text.ParseException;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    SecurityUtil securityUtil;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic/user", "/topic/admin", "/topic/game");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")
                .setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @SneakyThrows
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                assert accessor != null;

                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    verifyToken(accessor);
                } else if (StompCommand.SEND.equals(accessor.getCommand())) {
                    String destination = accessor.getNativeHeader("destination").get(0).toString();
                    SignedJWT signedJWT = verifyToken(accessor);
                    String role = securityUtil.getRole(signedJWT);

                    if (destination.equals("/app/userToAdmin") && !role.equals(PredefinedRole.ROLE_USER))
                        throw new AppException(ErrorCode.UNAUTHORIZED);

                    if (destination.startsWith("/app/adminToUser") && !role.equals(PredefinedRole.ROLE_ADMIN))
                        throw new AppException(ErrorCode.UNAUTHORIZED);
                } else if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
                    String destination = accessor.getNativeHeader("destination").get(0).toString();
                    if(destination.startsWith("/topic/game")) return message;
                    SignedJWT signedJWT = verifyToken(accessor);
                    String uid = securityUtil.getUuid(signedJWT);
                    String role = securityUtil.getRole(signedJWT);

                    if (destination.equals("/topic/admin") && !role.equals(PredefinedRole.ROLE_ADMIN))
                        throw new AppException(ErrorCode.UNAUTHORIZED);

                    if (destination.startsWith("/topic/user") && (!role.equals(PredefinedRole.ROLE_USER) || !uid.equals(destination.split("user/")[1])))
                        throw new AppException(ErrorCode.UNAUTHORIZED);
                }
                return message;
            }
        });
    }

    private SignedJWT verifyToken(StompHeaderAccessor accessor) {
        String list = accessor.getNativeHeader("token").get(0).toString();
        try {
            return securityUtil.verifyToken(list, false);
        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }
}