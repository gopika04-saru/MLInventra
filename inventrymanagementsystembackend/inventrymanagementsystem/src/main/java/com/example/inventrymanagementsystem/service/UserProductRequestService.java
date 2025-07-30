package com.example.inventrymanagementsystem.service;

import com.example.inventrymanagementsystem.model.UserProductRequest;
import com.example.inventrymanagementsystem.repository.UserProductRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProductRequestService {

    @Autowired
    private UserProductRequestRepository repository;

    public UserProductRequest save(UserProductRequest request) {
        return repository.save(request);
    }
}
