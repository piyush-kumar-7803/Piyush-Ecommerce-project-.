package com.Ecommerce.backend.service;


import com.Ecommerce.backend.Exception.ResourceNotFoundException;
import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.repo.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get all products
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    // Add product
    public Product addNewProduct(Product product) {

        return productRepository.save(product);
    }

    // Get product by ID
    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id " + id
                        ));
    }

    // Delete product
    public void deleteProductById(Long id) {

        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Product not found with id " + id
            );
        }

        productRepository.deleteById(id);
    }

    // Update product
    @Transactional
    public Product updateProductById(
            Long id,
            Product product) {

        Product existingProduct =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id " + id
                                ));

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setCategory(product.getCategory());

        return productRepository.save(existingProduct);
    }
}
