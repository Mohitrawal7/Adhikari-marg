package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.dto.LoginRequest;
import com.mohit.Adhikari_marg_backend.dto.LoginResponse;
import com.mohit.Adhikari_marg_backend.dto.RegisterRequest;
import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import com.mohit.Adhikari_marg_backend.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        // Checking if user already exist here
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            // Return error or 404 if the username is taken
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Username is already taken!");
        }

        // Create new user here now
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));   //protect password
        user.setEmail(registerRequest.getEmail());
        user.setPremium(false);
        user.setDOB(registerRequest.getDOB());
        user.setRole(registerRequest.getRole());
        user.setQuestion("What is favourite place ?");
        user.setAnswer("Hawaii");
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isPresent() &&
                passwordEncoder.matches(loginRequest.getPassword(), userOptional.get().getPassword())) {

            com.mohit.Adhikari_marg_backend.model.User user = userOptional.get();
            UserBuilder userBuilder = org.springframework.security.core.userdetails.User.withUsername(user.getUsername());
            userBuilder.password(user.getPassword());
            userBuilder.roles("USER");
            UserDetails userDetails = userBuilder.build();

            // Generate the token
            String token = jwtService.generateToken(userDetails);


            return ResponseEntity.ok(new LoginResponse("Login successful!", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }



}