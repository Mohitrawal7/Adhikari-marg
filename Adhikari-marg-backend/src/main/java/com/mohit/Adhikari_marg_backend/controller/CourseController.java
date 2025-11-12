package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.model.Course;
import com.mohit.Adhikari_marg_backend.service.CourseService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    @GetMapping("/institution/{institutionId}")
    public List<Course> getCoursesByInstitution(@PathVariable Long institutionId) {
        return courseService.getCoursesByInstitution(institutionId);
    }

    @PostMapping("/institution/{institutionId}")
    public Course createCourse(@PathVariable Long institutionId, @RequestBody Course course) {
        return courseService.createCourse(institutionId, course);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
        return courseService.updateCourse(id, course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }
}
