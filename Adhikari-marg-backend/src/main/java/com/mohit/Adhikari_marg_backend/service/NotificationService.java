package com.mohit.Adhikari_marg_backend.service;

import com.mohit.Adhikari_marg_backend.model.Notification;
import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.model.Job;
import com.mohit.Adhikari_marg_backend.repository.NotificationRepository;
import com.mohit.Adhikari_marg_backend.repository.JobRepository;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepo;
    private final JobRepository jobRepo;

    public NotificationService(NotificationRepository notificationRepo, JobRepository jobRepo){
        this.notificationRepo = notificationRepo;
        this.jobRepo = jobRepo;
    }


    // CREATE NOTIFICATION
    public Notification createNotification(User user, String message, Long jobId) {
        Notification notif = new Notification();
        notif.setUser(user);
        notif.setMessage(message);

        // Fetch the job by ID
        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));

        notif.setJob(job);

        return notificationRepo.save(notif);
    }
    // GET ALL NOTIFICATIONS FOR A USER
    @Transactional
    public List<Notification> getNotifications(User user) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    // DELETE NOTIFICATION BY ID
    public void deleteByJob(Job job) {
        notificationRepo.deleteByJob(job);
    }


    // AUTO DELETE NOTIFICATIONS OLDER THAN 3 DAYS
    @Scheduled(cron = "0 0 * * * *") // runs every hour
    public void deleteOldNotifications() {
        LocalDateTime threeDaysAgo = LocalDateTime.now().minusDays(3);
        notificationRepo.deleteByCreatedAtBefore(threeDaysAgo);
    }
}
