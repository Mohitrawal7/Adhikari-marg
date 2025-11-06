package com.mohit.Adhikari_marg_backend.dto;


public class LoginResponse {
    private String message;
    private String jwtToken;
    public LoginResponse() {
    }

    public LoginResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public LoginResponse(String message, String jwtToken) {
        this.message = message;
        this.jwtToken = jwtToken;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}