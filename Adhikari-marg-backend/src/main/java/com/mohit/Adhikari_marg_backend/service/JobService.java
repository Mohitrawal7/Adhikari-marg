// src/main/java/com/mohit/Adhikari_marg_backend/service/JobService.java
package com.mohit.Adhikari_marg_backend.service;

import com.mohit.Adhikari_marg_backend.dto.JobDto;
import com.mohit.Adhikari_marg_backend.exception.ResourceNotFoundException;
import com.mohit.Adhikari_marg_backend.model.Job;
import com.mohit.Adhikari_marg_backend.repository.JobRepository;
import org.modelmapper.ModelMapper; // For mapping DTO to Entity and vice-versa
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public JobDto createJob(JobDto jobDto) {
        Job job = modelMapper.map(jobDto, Job.class);
        Job savedJob = jobRepository.save(job);
        return modelMapper.map(savedJob, JobDto.class);
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

    public void deleteJob(Long jobId) {
        if (!jobRepository.existsById(jobId)) {
            throw new ResourceNotFoundException("Job not found with id: " + jobId);
        }
        jobRepository.deleteById(jobId);
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
    public List<JobDto> filterJobs(String location, String qualification, String dateFilter) {
        LocalDate postedOnStart = null;
        LocalDate postedOnEnd = null;
        LocalDate today = LocalDate.now();

        if (dateFilter != null) {
            switch (dateFilter.toLowerCase()) {
                case "today":
                    postedOnStart = today;
                    postedOnEnd = today;
                    break;
                case "lastweek":
                    // Start of last week (Monday) or 7 days ago. Let's use 7 days ago for simplicity.
                    postedOnStart = today.minusDays(6); // Today + 6 previous days = 7 days total
                    postedOnEnd = today;
                    break;
                case "all":
                default:
                    // No specific date filter
                    break;
            }
        }
        // If location or qualification are empty strings, treat as null for the query
        String finalLocation = (location != null && location.trim().isEmpty()) ? null : location;
        String finalQualification = (qualification != null && qualification.trim().isEmpty()) ? null : qualification;


        List<Job> filteredJobs = jobRepository.filterJobs(finalLocation, finalQualification, postedOnStart, postedOnEnd);
        return filteredJobs.stream()
                .map(job -> modelMapper.map(job, JobDto.class))
                .collect(Collectors.toList());
    }
}