package com.example.inventrymanagementsystem.service;

import com.example.inventrymanagementsystem.model.Product;
import com.example.inventrymanagementsystem.repository.ProductRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepo;

    public List<Product> getAll() {
        return productRepo.findAll();
    }

    public List<Product> getByCategory(String category) {
        return productRepo.findByCategoryIgnoreCase(category);
    }

    public List<Product> getByName(String name) {
        return productRepo.findByNameContainingIgnoreCase(name);
    }

    public List<Product> getLowStock() {
        return productRepo.findByQuantityLessThan(10);
    }

    public List<Product> getNormalStock() {
        return productRepo.findNormalStock();
    }

    public Product addProduct(Product product) {

        // If price is null or 0, use ML predicted price
        if (product.getPrice() == null || product.getPrice() == 0) {
            double predictedPrice = getPredictedPrice(product.getName(), product.getCategory());
            product.setPrice(predictedPrice);
        }

        return productRepo.save(product);
    }

    public Product updateProduct(Long id, Product updated) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        BeanUtils.copyProperties(updated, product, "id");
        return productRepo.save(product);
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    public Long getTotalProductCount() {
        return productRepo.countAllProducts();
    }

    public Long getLowStockCount() {
        return productRepo.countLowStock();
    }

    public Double getTotalInventoryValue() {
        return productRepo.calculateTotalInventoryValue();
    }

    public List<Product> getRecentProducts(int limit) {
        Pageable pageable = (Pageable) PageRequest.of(0, limit);
        return productRepo.findRecentProducts(pageable);
    }

    // ML integration for price prediction
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
