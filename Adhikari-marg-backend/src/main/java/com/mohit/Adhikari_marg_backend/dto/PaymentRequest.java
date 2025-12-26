package com.mohit.Adhikari_marg_backend.dto;



public class PaymentRequest {
    private String plan; // "Free", "User", "Organization", "Institute"
    private Long userId;


    public String getPlan() { return plan; }
    public void setPlan(String plan) { this.plan = plan; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}