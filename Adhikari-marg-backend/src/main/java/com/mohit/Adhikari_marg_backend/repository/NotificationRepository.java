package com.mohit.Adhikari_marg_backend.repository;

import com.mohit.Adhikari_marg_backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

    void deleteByCreatedAtBefore(LocalDateTime time);
}
