package com.example.inventrymanagementsystem.repository;

import com.example.inventrymanagementsystem.model.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

}
