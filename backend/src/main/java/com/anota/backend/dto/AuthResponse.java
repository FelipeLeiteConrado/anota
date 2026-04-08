package com.anota.backend.dto;

public class AuthResponse {

    private final String token;
    private final String permission;

    public AuthResponse(String token, String permission) {
        this.token = token;
        this.permission = permission;
    }

    public String getToken() { return token; }
    public String getPermission() { return permission; }
}