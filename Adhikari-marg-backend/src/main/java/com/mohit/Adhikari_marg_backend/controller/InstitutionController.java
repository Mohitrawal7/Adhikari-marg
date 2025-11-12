package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.model.Institution;
import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.service.InstitutionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/institutions")

public class InstitutionController {

    private final InstitutionService institutionService;

    public InstitutionController(InstitutionService institutionService) {
        this.institutionService = institutionService;
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
        // ⚠️ In real app, you’d get authenticated user from SecurityContext
        User user = new User();
        user.getId(); // Replace with real user ID
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
