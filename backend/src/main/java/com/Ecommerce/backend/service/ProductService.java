package com.Ecommerce.backend.service;


import com.Ecommerce.backend.repo.ProductRepository;

import org.springframework.stereotype.Service;



@Service
public class ProductService {
private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


}
