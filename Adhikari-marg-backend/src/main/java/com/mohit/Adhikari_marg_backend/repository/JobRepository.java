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

    List<Job> findByDeadlineBefore(LocalDate date);




    @Query("SELECT j FROM Job j WHERE " +
            "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:qualification IS NULL OR LOWER(j.qualification) LIKE LOWER(CONCAT('%', :qualification, '%')))")
    List<Job> filterJobs(@Param("location") String location,
                         @Param("qualification") String qualification);
}