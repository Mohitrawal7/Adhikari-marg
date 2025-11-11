// src/main/java/com/mohit/Adhikari_marg_backend/service/JobService.java
package com.mohit.Adhikari_marg_backend.service;

import com.mohit.Adhikari_marg_backend.dto.JobDto;
import com.mohit.Adhikari_marg_backend.exception.ResourceNotFoundException;
import com.mohit.Adhikari_marg_backend.model.Job;
import com.mohit.Adhikari_marg_backend.repository.JobRepository;
import org.modelmapper.ModelMapper; // For mapping DTO to Entity and vice-versa
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDate;
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

    public JobDto createJob(JobDto jobDto, MultipartFile pdfFile) {
//        Job job = modelMapper.map(jobDto, Job.class);
//        Job savedJob = jobRepository.save(job);
//        return modelMapper.map(savedJob, JobDto.class);


        Job job = new Job();
        job.setJobTitle(jobDto.getJobTitle());
        job.setAgency(jobDto.getAgency());
        job.setLocation(jobDto.getLocation());
        job.setQualification(jobDto.getQualification());
        job.setDeadline(jobDto.getDeadline());
        job.setPostedOn(jobDto.getPostedOn());
        job.setRequirement(jobDto.getRequirement());

        // Save PDF directly in DB
        if (pdfFile != null && !pdfFile.isEmpty()) {
            try {
                job.setPdfFile(pdfFile.getBytes()); // store bytes
                job.setPdfFileName(pdfFile.getOriginalFilename()); // store original filename
            } catch (IOException e) {
                throw new RuntimeException("Failed to read PDF file", e);
            }
        }

        Job savedJob = jobRepository.save(job);

        // Convert to DTO
        JobDto savedDto = new JobDto();
        savedDto.setJobId(savedJob.getJobId());
        savedDto.setJobTitle(savedJob.getJobTitle());
        savedDto.setAgency(savedJob.getAgency());
        savedDto.setLocation(savedJob.getLocation());
        savedDto.setQualification(savedJob.getQualification());
        savedDto.setDeadline(savedJob.getDeadline());
        savedDto.setPostedOn(savedJob.getPostedOn());
        savedDto.setRequirement(savedJob.getRequirement());
        savedDto.setPdfFileName(savedJob.getPdfFileName());
        // You can also include pdfFile in DTO as byte[] if needed

        return savedDto;


    }


    //download pdf
    public byte[] getJobPdf(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        if (job.getPdfFile() == null) {
            throw new RuntimeException("No PDF attached to this job");
        }
        return job.getPdfFile();
    }

    public String getJobPdfFileName(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return job.getPdfFileName();
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

    /**
     * Filters jobs based on optional criteria: location, qualification, and posted date range.
     * Date filter options:
     * - "today": jobs posted on the current date.
     * - "lastWeek": jobs posted in the last 7 days (including today).
     * - "all" or null: no date filtering.
     *
     * @param location Optional location keyword for filtering.
     * @param qualification Optional qualification keyword for filtering.
     * @param dateFilter Optional string for date filtering ("today", "lastWeek", "all").
     * @return List of JobDto matching the criteria.
     */
    public List<JobDto> filterJobs(String location, String qualification) {
        LocalDate postedOnStart = null;
        LocalDate postedOnEnd = null;
        LocalDate today = LocalDate.now();

        // If location or qualification are empty strings, treat as null for the query
        String finalLocation = (location != null && location.trim().isEmpty()) ? null : location;
        String finalQualification = (qualification != null && qualification.trim().isEmpty()) ? null : qualification;


        List<Job> filteredJobs = jobRepository.filterJobs(finalLocation, finalQualification, postedOnStart, postedOnEnd);
        return filteredJobs.stream()
                .map(job -> modelMapper.map(job, JobDto.class))
                .collect(Collectors.toList());
    }
}