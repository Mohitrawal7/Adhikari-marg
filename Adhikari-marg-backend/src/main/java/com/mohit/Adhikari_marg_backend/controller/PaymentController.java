package com.mohit.Adhikari_marg_backend.controller;

import com.mohit.Adhikari_marg_backend.model.User;
import com.mohit.Adhikari_marg_backend.repository.UserRepository;
import com.mohit.Adhikari_marg_backend.service.EsewaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // adjust if your front runs on other host/port
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EsewaService esewaService;

    @PostMapping("/verify")
    public String verifyEsewaPayment(
            @RequestParam String pid,
            @RequestParam String refId,
            @RequestParam double amt) {

        boolean success = esewaService.verifyPayment(pid, refId, amt);

        if (success) {
            Optional<User> optionalUser = userRepository.findById(Long.parseLong(pid));
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setPremium(true); // mark as premium
                userRepository.save(user);
                return "Payment Verified and User Upgraded to Premium ✅";
            } else {
                return "User not found ❌";
            }
        } else {
            return "Payment verification failed ❌";
        }
    }

    // New mock endpoint for local development:
    @PostMapping("/mock")
    public String mockPayment(@RequestBody Map<String, Object> body) {
        try {
            String pid = String.valueOf(body.get("pid"));
            double amt = Double.parseDouble(String.valueOf(body.get("amt")));
            String refId = String.valueOf(body.get("refId"));

            // Optional: you can log/store the mock payment
            System.out.println("Mock payment received: pid=" + pid + " amt=" + amt + " refId=" + refId);

            // Upgrade user to premium
            Optional<User> optionalUser = userRepository.findById(Long.parseLong(pid));
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setPremium(true);
                userRepository.save(user);
                return "Mock payment successful — user upgraded to Premium ✅";
            } else {
                return "Mock payment: user not found ❌";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Mock payment: error processing request ❌";
        }
    }


}
