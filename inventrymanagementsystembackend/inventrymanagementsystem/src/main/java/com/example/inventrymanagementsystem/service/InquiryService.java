package com.example.inventrymanagementsystem.service;

import org.springframework.web.client.RestTemplate;
import com.example.inventrymanagementsystem.model.Inquiry;
import com.example.inventrymanagementsystem.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InquiryService {
    @Autowired
    private InquiryRepository inquiryRepo;

    @Autowired
    private RestTemplate restTemplate;

    public Inquiry saveInquiry(Inquiry inquiry) {
        // Call ML API
        String flaskUrl = "http://localhost:5000/predict-priority";
        Map<String, String> request = new HashMap<>();
        request.put("message", inquiry.getMessage());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, entity, Map.class);
            String priority = (String) response.getBody().get("priority");
            inquiry.setPriority(priority);
        } catch (Exception e) {
            inquiry.setPriority("Unknown");
        }

        return inquiryRepo.save(inquiry);
    }


    public List<Inquiry> getAll() {
        return inquiryRepo.findAll();
    }
}
