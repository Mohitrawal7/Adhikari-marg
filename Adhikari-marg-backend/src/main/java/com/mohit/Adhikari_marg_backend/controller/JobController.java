// src/main/java/com/mohit/Adhikari_marg_backend/controller/JobController.java
package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.dto.JobDto;
import com.mohit.Adhikari_marg_backend.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
//    @Autowired
//    private NotificationService notificationService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // --- Publicly Accessible Filtering Endpoints ---

    @GetMapping("/filter")
    public ResponseEntity<List<JobDto>> filterJobs(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String qualification
            // "today", "lastWeek", "all"
    ) {
        List<JobDto> jobs = jobService.filterJobs(location, qualification);
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

    @PostMapping(consumes = {"multipart/form-data"})
//    @PreAuthorize("hasRole('ORGANIZATION')") // Only users with ROLE_ORGANIZATION can create jobs
    public ResponseEntity<JobDto> createJob(@RequestPart("job") @Valid  JobDto jobDto,
                                            @RequestPart(value = "pdfFile",required = false)MultipartFile pdfFile
                                            ) {
        JobDto createdJob = jobService.createJob(jobDto,pdfFile);
//        notificationService.checkAndNotify(createdJob);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ORGANIZATION')") // Only users with ROLE_ORGANIZATION can update jobs
    public ResponseEntity<JobDto> updateJob(@PathVariable Long id, @Valid @RequestBody JobDto jobDto) {
        JobDto updatedJob = jobService.updateJob(id, jobDto);
        return ResponseEntity.ok(updatedJob);
    }


    @GetMapping("/download-pdf/{jobId}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long jobId) {
        byte[] pdfData = jobService.getJobPdf(jobId);
        String fileName = jobService.getJobPdfFileName(jobId);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfData);
    }





//
//    @DeleteMapping("/{jobId}")
//    @PreAuthorize("hasRole('ORGANIZATION')") // Only users with ROLE_ORGANIZATION can delete jobs
//    public ResponseEntity<Void> deleteJob(@PathVariable Long jobId) {
//        jobService.deleteJob(jobId);
//        return ResponseEntity.noContent().build();
//    }

}