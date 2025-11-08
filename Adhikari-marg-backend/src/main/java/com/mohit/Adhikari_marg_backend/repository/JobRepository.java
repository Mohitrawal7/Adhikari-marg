// src/main/java/com/mohit/Adhikari_marg_backend/repository/JobRepository.java
package com.mohit.Adhikari_marg_backend.repository;

import com.mohit.Adhikari_marg_backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Find jobs by location (case-insensitive)
    List<Job> findByLocationContainingIgnoreCase(String location);

    // Find jobs by qualification (case-insensitive)
    List<Job> findByQualificationContainingIgnoreCase(String qualification);

    // Find jobs posted on a specific date (e.g., today)
    List<Job> findByPostedOn(LocalDate postedOn);

    // Find jobs posted from a specific date onwards (e.g., last week)
    List<Job> findByPostedOnGreaterThanEqual(LocalDate postedOnStart);

    // Custom query to filter by multiple criteria (location, qualification, posted date range)
    @Query("SELECT j FROM Job j WHERE " +
            "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:qualification IS NULL OR LOWER(j.qualification) LIKE LOWER(CONCAT('%', :qualification, '%'))) AND " +
            "(:postedOnStart IS NULL OR j.postedOn >= :postedOnStart) AND " +
            "(:postedOnEnd IS NULL OR j.postedOn <= :postedOnEnd)")
    List<Job> filterJobs(
            @Param("location") String location,
            @Param("qualification") String qualification,
            @Param("postedOnStart") LocalDate postedOnStart,
            @Param("postedOnEnd") LocalDate postedOnEnd);
}