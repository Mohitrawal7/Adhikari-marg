package com.mohit.Adhikari_marg_backend.service;


import com.mohit.Adhikari_marg_backend.dto.ChangePasswordRequest;
import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // use Spring Security's encoder

    public String changePassword(ChangePasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the security question matches
        if (!user.getQuestion().equals(request.getQuestion())) {
            throw new RuntimeException("Security question does not match");
        }

        // Check if answer matches
        if (!user.getAnswer().equals(request.getAnswer())) {
            throw new RuntimeException("Answer is incorrect");
        }

        // Update password (hash it)
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return "Password updated successfully";
    }
}
