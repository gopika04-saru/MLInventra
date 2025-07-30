package com.example.inventrymanagementsystem.controller;

import com.example.inventrymanagementsystem.model.UserProductRequest;
import com.example.inventrymanagementsystem.service.UserProductRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user-products")
public class UserProductRequestController {

    @Autowired
    private UserProductRequestService service;

    @PostMapping
    public UserProductRequest submitProductRequest(@RequestBody UserProductRequest request) {
        return service.save(request);
    }
}
