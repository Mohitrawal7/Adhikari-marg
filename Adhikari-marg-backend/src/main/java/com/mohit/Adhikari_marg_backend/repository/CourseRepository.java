package com.mohit.Adhikari_marg_backend.repository;

import com.mohit.Adhikari_marg_backend.model.Course;
import com.mohit.Adhikari_marg_backend.model.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstitution(Institution institution);

}
