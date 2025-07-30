package com.example.inventrymanagementsystem.repository;

import com.example.inventrymanagementsystem.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Find by category (exact match)
    List<Product> findByCategoryIgnoreCase(String category);

    // Find by name containing keyword
    List<Product> findByNameContainingIgnoreCase(String name);

    // Low stock: quantity < 10
    List<Product> findByQuantityLessThan(int qty);

    // Normal stock: 10 <= quantity <= 50
    @Query("SELECT p FROM Product p WHERE p.quantity > 10")
    List<Product> findNormalStock();

    @Query("SELECT COUNT(p) FROM Product p")
    Long countAllProducts();

    @Query("SELECT COUNT(p) FROM Product p WHERE p.quantity < 10")
    Long countLowStock();

    @Query("SELECT SUM(p.price * p.quantity) FROM Product p")
    Double calculateTotalInventoryValue();

    @Query("SELECT p FROM Product p ORDER BY p.id DESC")
    List<Product> findRecentProducts(Pageable pageable);
}
