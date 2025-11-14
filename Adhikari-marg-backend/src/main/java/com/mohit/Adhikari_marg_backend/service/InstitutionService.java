package com.mohit.Adhikari_marg_backend.service;

import com.mohit.Adhikari_marg_backend.model.Institution;
import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.repository.InstitutionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InstitutionService {

    private final InstitutionRepository institutionRepository;

    public InstitutionService(InstitutionRepository institutionRepository) {
        this.institutionRepository = institutionRepository;
    }

    public List<Institution> getAllInstitutions() {
        return institutionRepository.findAll();
    }

    public Institution getInstitutionById(Long institutionId) {
        return institutionRepository.findById(institutionId)
                .orElseThrow(() -> new RuntimeException("Institution not found with id: " + institutionId));
    }

    public Institution createInstitution(Institution institution, User owner) {
        List<Institution> existing = institutionRepository.findByOwner(owner);
        if (existing.size() >= 3) {
            throw new RuntimeException("You can only create up to 3 institutions.");
        }
        institution.setOwner(owner);
        return institutionRepository.save(institution);
    }

    public Institution updateInstitution(Long id, Institution updatedInstitution) {
        Institution existing = getInstitutionById(id);
        existing.setName(updatedInstitution.getName());
        existing.setDescription(updatedInstitution.getDescription());
        return institutionRepository.save(existing);
    }

    public void deleteInstitution(Long id) {
        Institution existing = getInstitutionById(id);
        institutionRepository.delete(existing);
    }

    public List<Institution> getInstitutionsByUser(User owner) {
        return institutionRepository.findByOwner(owner);
    }
}
