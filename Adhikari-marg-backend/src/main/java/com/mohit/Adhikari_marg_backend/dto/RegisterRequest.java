package com.mohit.Adhikari_marg_backend.dto;


import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String role;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate DOB;

    private boolean isPremium;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDOB() {
        return DOB;
    }

    public void setDOB(LocalDate DOB) {
        this.DOB = DOB;
    }

    public boolean isPremium() {
        return isPremium;
    }

    public void setPremium(boolean premium) {
        isPremium = premium;
    }
}