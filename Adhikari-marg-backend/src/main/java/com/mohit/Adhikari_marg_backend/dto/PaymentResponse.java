package com.mohit.Adhikari_marg_backend.dto;

public class PaymentResponse {

        private String username;
        private String plan;
        private double amount;
        private String role;
        private boolean isPremium;

        public PaymentResponse(String username, String plan, double amount, String role, boolean isPremium) {
            this.username = username;
            this.plan = plan;
            this.amount = amount;
            this.role = role;
            this.isPremium = isPremium;
        }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isPremium() {
        return isPremium;
    }

    public void setPremium(boolean premium) {
        isPremium = premium;
    }
}
