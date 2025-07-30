package com.example.inventrymanagementsystem.repository;

import com.example.inventrymanagementsystem.model.UserProductRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProductRequestRepository extends JpaRepository<UserProductRequest, Long> {
}
