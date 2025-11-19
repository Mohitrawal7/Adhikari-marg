package com.mohit.Adhikari_marg_backend.service;

import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.model.UserPreference;
import com.mohit.Adhikari_marg_backend.repository.UserPreferenceRepository;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPreferenceService {

    private final UserPreferenceRepository preferenceRepo;
    private final UserRepository userRepo;


    public UserPreferenceService(UserPreferenceRepository preferenceRepo,UserRepository userRepo){
        this.preferenceRepo = preferenceRepo;
        this.userRepo = userRepo;
    }

    // CREATE
    // Fetch all preferences for a given user
    public List<UserPreference> getPreferences(User user) {
        return preferenceRepo.findByUser(user);
    }

    // Add a preference for a given user
    public UserPreference addPreference(User user, UserPreference preference) {
        preference.setUser(user);
        return preferenceRepo.save(preference);
    }

    // Delete a preference (only if it belongs to the user)
    public void deletePreference(User user, Long id) {
        UserPreference preference = preferenceRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Preference not found"));

        if (!preference.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        preferenceRepo.delete(preference);
    }



}


