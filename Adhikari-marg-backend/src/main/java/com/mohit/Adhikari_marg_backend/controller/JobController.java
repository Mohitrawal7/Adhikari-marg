// src/main/java/com/mohit/Adhikari_marg_backend/controller/JobController.java
package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.dto.JobDto;
import com.mohit.Adhikari_marg_backend.exception.ResourceNotFoundException;
import com.mohit.Adhikari_marg_backend.model.Job;
import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import com.mohit.Adhikari_marg_backend.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    @Autowired
    private UserRepository userRepository;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // --- Publicly Accessible Filtering Endpoints ---

    @GetMapping("/filter")
    public ResponseEntity<List<JobDto>> filterJobs(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String qualification
    ) {
        List<JobDto> jobs = jobService.filterJobs(location, qualification);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs() {
       return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobDto> getJobById(@PathVariable Long jobId) {
        return ResponseEntity.ok(jobService.getJobById(jobId));
    }


    // --- ORGANIZATION Role Restricted CRUD Operations ---

    @PostMapping(consumes = {"multipart/form-data"})
//    @PreAuthorize("hasRole('ORGANIZATION')") // Only users with ROLE_ORGANIZATION can create jobs
    public ResponseEntity<JobDto> createJob(@RequestPart("job") @Valid  JobDto jobDto,
                                            @RequestPart(value = "file",required = false)MultipartFile file
                                            ) {
        try {
            JobDto createdJob = jobService.createJob(jobDto, file);
            // notificationService.checkAndNotify(createdJob); // Uncomment if using NotificationService
            return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating job with file: " + e.getMessage(), e);
        }
    }


    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ORGANIZATION')") // Only users with ROLE_ORGANIZATION can update jobs
    public ResponseEntity<JobDto> updateJob(@PathVariable Long id, @Valid @RequestBody JobDto jobDto) {
        JobDto updatedJob = jobService.updateJob(id, jobDto);
        return ResponseEntity.ok(updatedJob);
    }


    @GetMapping("/download-file/{jobId}")
    public ResponseEntity<byte[]> downloadfile(@PathVariable Long jobId) {
        try {
            byte[] fileData = jobService.getJobFile(jobId); // Use getJobFile
            String fileName = jobService.getJobFileName(jobId); // Use getJobFileName
            String fileType = jobService.getJobFileType(jobId); // Use new method to get file type

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .contentType(MediaType.parseMediaType(fileType)) // Use dynamic fileType
                    .body(fileData);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error downloading file: " + e.getMessage(), e);
        }
    }




        // Return only the fields you want — VERY clean
        @GetMapping("/preferred")
        public ResponseEntity<List<Map<String, Object>>> getPreferredJobs() {

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Job> jobs = jobService.getPreferredJobs(user);

            List<Map<String, Object>> result = jobs.stream()
                    .map(j -> {
                        Map<String, Object> data = new HashMap<>();
                        data.put("id", j.getJobId());
                        data.put("title", j.getJobTitle());
                        data.put("agency", j.getAgency());
                        data.put("location", j.getLocation());
                        data.put("qualification", j.getQualification());
                        data.put("postedDate", j.getPostedOn()); // or getPostedDate()
                        return data;
                    })
                    .toList();

            return ResponseEntity.ok(result);
        }





}