package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.dto.NotificationDto;
import com.mohit.Adhikari_marg_backend.model.Notification;
import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import com.mohit.Adhikari_marg_backend.service.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public NotificationController(NotificationService notificationService,UserRepository userRepository){
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }




    @Transactional
    @GetMapping
    public List<NotificationDto> getNotifications() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Notification> notifications = notificationService.getNotifications(user);

        // Map to DTO with jobId
        return notifications.stream().map(n -> new NotificationDto(
                n.getId(),
                n.getMessage(),
                n.getCreatedAt(),
                n.isSeen(),
                n.getJob() != null ? n.getJob().getJobId() : null
        )).toList();
    }


//    // DELETE NOTIFICATION BY ID
//    @DeleteMapping("/{id}")
//    public String deleteNotification(@PathVariable Long id) {
//        notificationService.deleteNotification(id);
//        return "Notification deleted";
//    }


}
