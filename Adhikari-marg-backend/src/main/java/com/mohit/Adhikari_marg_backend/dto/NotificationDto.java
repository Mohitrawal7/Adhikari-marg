package com.mohit.Adhikari_marg_backend.dto;

import java.time.LocalDateTime;

public class NotificationDto {
    private Long id;
    private String message;
    private LocalDateTime createdAt;
    private boolean seen;
    private Long jobId;

    public NotificationDto(Long id, String message, LocalDateTime createdAt, boolean seen, Long jobId) {
        this.id = id;
        this.message = message;
        this.createdAt = createdAt;
        this.seen = seen;
        this.jobId = jobId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }
}
