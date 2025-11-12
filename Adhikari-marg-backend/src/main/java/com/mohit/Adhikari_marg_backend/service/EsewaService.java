package com.mohit.Adhikari_marg_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
@Service
public class EsewaService {

    @Value("${esewa.merchant.code}")
    private String merchantCode;

    @Value("${esewa.verify.url}")
    private String verifyUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean verifyPayment(String pid, String refId, double amt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        Map<String, String> params = new HashMap<>();
        params.put("amt", String.valueOf(amt));
        params.put("scd", merchantCode);
        params.put("pid", pid);
        params.put("rid", refId);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(verifyUrl, request, String.class);
            return response.getBody() != null && response.getBody().contains("Success");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
