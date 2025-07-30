package com.example.inventrymanagementsystem.controller;

import com.example.inventrymanagementsystem.model.Product;
import com.example.inventrymanagementsystem.model.UserProductRequest;
import com.example.inventrymanagementsystem.repository.ProductRepository;
import com.example.inventrymanagementsystem.repository.UserProductRequestRepository;
import com.example.inventrymanagementsystem.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserProductRequestRepository requestRepo;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAll() {
        return productService.getAll();
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return productService.getByCategory(category);
    }

    // Fetch by name (partial match)
    @GetMapping("/search")
    public List<Product> searchByName(@RequestParam("name") String name) {
        return productService.getByName(name);
    }

    // Fetch by stock level
    @GetMapping("/stock")
    public List<Product> getByStockLevel(@RequestParam("level") String level) {
        switch (level.toLowerCase()) {
            case "low":
                return productService.getLowStock();
            case "normal":
                return productService.getNormalStock();
            case "all":
                return productService.getAll();
            default:
                throw new IllegalArgumentException("Invalid stock level: " + level);
        }
    }

    @GetMapping("/count")
    public Long getTotalProducts() {
        return productService.getTotalProductCount();
    }

    @GetMapping("/stock/low/count")
    public Long getLowStockCount() {
        return productService.getLowStockCount();
    }

    @GetMapping("/total-value")
    public Double getTotalInventoryValue() {
        return productService.getTotalInventoryValue();
    }

    @GetMapping("/recent")
    public List<Product> getRecentProducts(@RequestParam(defaultValue = "5") int limit) {
        return productService.getRecentProducts(limit);
    }

    // Get all pending requests
    @GetMapping("/pending")
    public List<UserProductRequest> getPendingRequests() {
        return requestRepo.findAll().stream()
                .filter(r -> r.getStatus() == UserProductRequest.Status.PENDING)
                .collect(Collectors.toList());
    }

    // Accept request
    @PostMapping("/accept/{id}")
    public ResponseEntity<?> acceptRequest(@PathVariable Long id, @RequestBody Product productDetails) {
        Optional<UserProductRequest> optional = requestRepo.findById(id);
        if (!optional.isPresent()) return ResponseEntity.notFound().build();

        UserProductRequest request = optional.get();
        request.setStatus(UserProductRequest.Status.ACCEPTED);
        requestRepo.save(request);

        // ML API call to get predicted price
        double predictedPrice = getPredictedPrice(request.getProductName(), request.getCategory());

        // Add to products list
        Product product = new Product();
        product.setName(request.getProductName());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());
        product.setDescription(request.getDescription());

        // Use ML predicted price
        product.setPrice(predictedPrice);     // from admin input

        product.setQuantity(productDetails.getQuantity()); // from admin input
        productRepository.save(product);

        return ResponseEntity.ok("Accepted and price predicted: " + predictedPrice);
    }

    // Reject request
    @PostMapping("/reject/{id}")
    public ResponseEntity<?> rejectRequest(@PathVariable Long id) {
        Optional<UserProductRequest> optional = requestRepo.findById(id);
        if (!optional.isPresent()) return ResponseEntity.notFound().build();

        UserProductRequest request = optional.get();
        request.setStatus(UserProductRequest.Status.REJECTED);
        requestRepo.save(request);

        return ResponseEntity.ok("Rejected");
    }

    private double getPredictedPrice(String name, String category) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:5000/predict-price";

        Map<String, String> payload = new HashMap<>();
        payload.put("name", name);
        payload.put("category", category);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                return Double.parseDouble(response.getBody().get("predicted_price").toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return 1000.0; // fallback price
    }

}
