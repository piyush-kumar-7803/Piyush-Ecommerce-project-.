package com.Ecommerce.backend.service;


import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.repo.ProductRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


@Service
public class ProductService {
private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @GetMapping("/allproducts")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
