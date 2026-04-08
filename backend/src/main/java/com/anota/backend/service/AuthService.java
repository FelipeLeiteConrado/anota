package com.anota.backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
public class AuthService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Value("${jwt.secret}")
    private String jwtSecret;

    public String hashPassword(String password) {
        return encoder.encode(password);
    }

    public Boolean verifyPassword(String password, String hash) {
        return encoder.matches(password, hash);
    }

    public String generateToken(String slug, String permission) {
        return JWT.create()
                .withClaim("slug", slug)
                .withClaim("permission", permission)
                .withExpiresAt(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000L))
                .sign(Algorithm.HMAC256(jwtSecret));
    }
}
