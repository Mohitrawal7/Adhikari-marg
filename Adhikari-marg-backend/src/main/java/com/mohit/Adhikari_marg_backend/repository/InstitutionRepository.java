package com.mohit.Adhikari_marg_backend.repository;

import com.mohit.Adhikari_marg_backend.model.Institution;
import com.mohit.Adhikari_marg_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    List<Institution> findByOwner(User owner);
}
