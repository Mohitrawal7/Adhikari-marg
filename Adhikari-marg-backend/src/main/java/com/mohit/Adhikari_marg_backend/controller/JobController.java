// src/main/java/com/mohit/Adhikari_marg_backend/controller/JobController.java
package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.dto.JobDto;
import com.mohit.Adhikari_marg_backend.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // --- Publicly Accessible Filtering Endpoints ---

    @GetMapping("/filter")
    public ResponseEntity<List<JobDto>> filterJobs(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String qualification,
            @RequestParam(required = false) String dateFilter // "today", "lastWeek", "all"
    ) {
        List<JobDto> jobs = jobService.filterJobs(location, qualification, dateFilter);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs() {
        // Can be accessed by anyone, but CRUD is restricted.
        // For simplicity, getAllJobs also made public. Consider if this should be restricted.
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobDto> getJobById(@PathVariable Long jobId) {
        return ResponseEntity.ok(jobService.getJobById(jobId));
    }


    // --- ORGANIZATION Role Restricted CRUD Operations ---

    @PostMapping
    @PreAuthorize("hasRole('ORGANIZATION')") // Only users with ROLE_ORGANIZATION can create jobs
    public ResponseEntity<JobDto> createJob(@Valid @RequestBody JobDto jobDto) {
        JobDto createdJob = jobService.createJob(jobDto);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ORGANIZATION')") // Only users with ROLE_ORGANIZATION can update jobs
    public ResponseEntity<JobDto> updateJob(@PathVariable Long id, @Valid @RequestBody JobDto jobDto) {
        JobDto updatedJob = jobService.updateJob(id, jobDto);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{jobId}")
    @PreAuthorize("hasRole('ORGANIZATION')") // Only users with ROLE_ORGANIZATION can delete jobs
    public ResponseEntity<Void> deleteJob(@PathVariable Long jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.noContent().build();
    }
}