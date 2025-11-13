// src/main/java/com/mohit/Adhikari_marg_backend/service/JobService.java
package com.mohit.Adhikari_marg_backend.service;

import com.mohit.Adhikari_marg_backend.dto.JobDto;
import com.mohit.Adhikari_marg_backend.exception.ResourceNotFoundException;
import com.mohit.Adhikari_marg_backend.model.Course;
import com.mohit.Adhikari_marg_backend.model.Job;
import com.mohit.Adhikari_marg_backend.repository.JobRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final ModelMapper modelMapper; // Inject ModelMapper

    @Autowired
    public JobService(JobRepository jobRepository, ModelMapper modelMapper) {
        this.jobRepository = jobRepository;
        this.modelMapper = modelMapper;
    }

    // Auto deleting of jobs
//    @Scheduled(cron = "0 0 0 * * ?")
    @Scheduled(cron = "0 * * * * ?") // every minute
    public void deleteExpiredJobs() {
        LocalDate today = LocalDate.now();
        var expiredJobs = jobRepository.findByDeadlineBefore(today);

        if (!expiredJobs.isEmpty()) {
            jobRepository.deleteAll(expiredJobs);
            System.out.println("🧹 Deleted " + expiredJobs.size() + " expired jobs on " + today);
        }
    }


    // --- CRUD Operations ---

    public List<JobDto> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(job -> modelMapper.map(job, JobDto.class))
                .collect(Collectors.toList());
    }

    public JobDto getJobById(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));
        return modelMapper.map(job, JobDto.class);
    }

    public JobDto createJob(JobDto jobDto, MultipartFile file) throws IOException {
        Job job = modelMapper.map(jobDto, Job.class);


        // Save generic file data directly in DB
        if (file != null && !file.isEmpty()) {
            job.setFileName(file.getOriginalFilename());
            job.setFileType(file.getContentType());
            job.setUploadDate(LocalDateTime.now());
            job.setData(file.getBytes());
        } else {
            // Handle case where no file is provided (e.g., set file fields to null)
            job.setFileName(null);
            job.setFileType(null);
            job.setUploadDate(null);
            job.setData(null);
        }

        Job savedJob = jobRepository.save(job);
        return modelMapper.map(savedJob, JobDto.class); // Map saved Job back to DTO
    }



    // --- File Download Methods (Updated) ---
    public byte[] getJobFile(Long jobId) { // Renamed from getJobPdf
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId)); // Use ResourceNotFoundException
        if (job.getData() == null) {
            throw new ResourceNotFoundException("No file attached to this job with id: " + jobId); // More specific error
        }
        return job.getData();
    }

    public String getJobFileName(Long jobId) { // Renamed from getJobPdfFileName
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));
        return job.getFileName();
    }

    public String getJobFileType(Long jobId) { // New method to get file type
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));
        return job.getFileType();
    }

    public JobDto updateJob(Long jobId, JobDto jobDto) {
        Job existingJob = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        // Update fields from DTO to existing entity
        existingJob.setJobTitle(jobDto.getJobTitle());
        existingJob.setAgency(jobDto.getAgency());
        existingJob.setLocation(jobDto.getLocation());
        existingJob.setQualification(jobDto.getQualification());
        existingJob.setDeadline(jobDto.getDeadline());
        existingJob.setPostedOn(jobDto.getPostedOn());

        Job updatedJob = jobRepository.save(existingJob);
        return modelMapper.map(updatedJob, JobDto.class);
    }


    // --- Filtering Logic ---
    public List<JobDto> filterJobs(String location, String qualification) {
        String finalLocation = (location != null && location.trim().isEmpty()) ? null : location;
        String finalQualification = (qualification != null && qualification.trim().isEmpty()) ? null : qualification;

        List<Job> filteredJobs = jobRepository.filterJobs(finalLocation, finalQualification);
        return filteredJobs.stream()
                .map(job -> modelMapper.map(job, JobDto.class))
                .collect(Collectors.toList());
    }



}
