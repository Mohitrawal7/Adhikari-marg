package com.mohit.Adhikari_marg_backend.repository;

import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.model.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {

    List<UserPreference> findByUser(User user);

    @Query("""
    SELECT up.user FROM UserPreference up
    WHERE (:jobTitle IS NOT NULL AND up.type = 'title' AND up.keyword = :jobTitle)
       OR (:location IS NOT NULL AND up.type = 'location' AND up.keyword = :location)
       OR (:qualification IS NOT NULL AND up.type = 'qualification' AND up.keyword = :qualification)
""")
    List<User> findMatchingUsers(
            @Param("jobTitle") String jobTitle,
            @Param("location") String location,
            @Param("qualification") String qualification
    );
}