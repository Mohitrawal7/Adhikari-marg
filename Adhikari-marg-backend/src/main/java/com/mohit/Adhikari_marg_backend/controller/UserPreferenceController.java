package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.model.UserPreference;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import com.mohit.Adhikari_marg_backend.service.UserPreferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/preferences")
public class UserPreferenceController {

    private final UserPreferenceService preferenceService;
    private final UserRepository userRepository;

    public UserPreferenceController(UserPreferenceService preferenceService,UserRepository userRepository){
        this.preferenceService = preferenceService;
        this.userRepository = userRepository;
    }


    @GetMapping
    public List<UserPreference> getPreferences() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return preferenceService.getPreferences(user);
    }

    // ADD NEW PREFERENCE
    @PostMapping
    public UserPreference addPreference(@RequestBody CreatePreferenceRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserPreference preference = new UserPreference();
        preference.setKeyword(request.getKeyword());
        preference.setType(request.getType());

        return preferenceService.addPreference(user, preference);
    }

    // DELETE PREFERENCE
    @DeleteMapping("/{id}")
    public String deletePreference(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        preferenceService.deletePreference(user, id);
        return "Preference deleted";
    }

    public static class CreatePreferenceRequest {
        private String keyword;
        private String type;

        // getters & setters
        public String getKeyword() {
            return keyword;
        }

        public void setKeyword(String keyword) {
            this.keyword = keyword;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }

}
