package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.model.Institution;
import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import com.mohit.Adhikari_marg_backend.service.InstitutionService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/institutions")

public class InstitutionController {

    private final InstitutionService institutionService;
    private final UserRepository userRepository;

    public InstitutionController(InstitutionService institutionService, UserRepository userRepository) {
        this.institutionService = institutionService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Institution> getAllInstitutions() {
        return institutionService.getAllInstitutions();
    }

    @GetMapping("/{institutionId}")
    public Institution getInstitutionById(@PathVariable Long institutionId) {
        return institutionService.getInstitutionById(institutionId);
    }

    @PostMapping
    public Institution createInstitution(@RequestBody Institution institution) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return institutionService.createInstitution(institution, user);
    }

    @PutMapping("/{id}")
    public Institution updateInstitution(@PathVariable Long id, @RequestBody Institution institution) {
        return institutionService.updateInstitution(id, institution);
    }

    @DeleteMapping("/{id}")
    public void deleteInstitution(@PathVariable Long id) {
        institutionService.deleteInstitution(id);
    }
}
