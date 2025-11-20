package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.dto.PaymentRequest;
import com.mohit.Adhikari_marg_backend.dto.PaymentResponse;
import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import com.mohit.Adhikari_marg_backend.service.EsewaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

 // adjust if your front runs on other host/port
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/pay")
    public PaymentResponse pay(@RequestBody PaymentRequest request) {
        Optional<User> optionalUser = userRepository.findById(request.getUserId());
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();
        double amount;
        String newRole;
        boolean updatePremium = false;

        switch (request.getPlan().toLowerCase()) {
            case "user":
                amount = 1.0;
                newRole = "USER";
                updatePremium = true;
                break;
            case "organization":
                amount = 2.0;
                newRole = "ORGANIZATION";
                updatePremium = true;
                break;
            case "institution":
                amount = 3.0;
                newRole = "INSTITUTION";
                updatePremium = true;
                break;
            case "free":
            default:
                amount = 0.0;
                newRole = user.getRole(); // keep existing role
                updatePremium = false;
                break;
        }

        // Update role and isPremium only if plan is paid
        if (updatePremium) {
            user.setRole(newRole);
            user.setPremium(true);
            userRepository.save(user);
        }

        return new PaymentResponse(
                user.getEmail(),
                request.getPlan(),
                amount,
                user.getRole(),
                user.isPremium()
        );
    }

}
