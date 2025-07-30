package com.example.inventrymanagementsystem.controller;

import com.example.inventrymanagementsystem.model.Inquiry;
import com.example.inventrymanagementsystem.service.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin(origins = "*")
public class InquiryController {

    @Autowired
    private InquiryService inquiryService;

    // Submit a new inquiry
    @PostMapping
    public Inquiry submitInquiry(@RequestBody Inquiry inquiry) {
        return inquiryService.saveInquiry(inquiry);
    }

    //  Get all inquiries (Admin use)
    @GetMapping
    public List<Inquiry> getAllInquiries() {
        return inquiryService.getAll();
    }
}
