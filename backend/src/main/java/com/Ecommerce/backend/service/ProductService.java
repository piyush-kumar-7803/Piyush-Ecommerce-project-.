package com.Ecommerce.backend.service;


import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.repo.ProductRepository;

import jakarta.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }



    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addNewProduct(Product product){
        return productRepository.save(product);
    }

    public Product getProductById( int id) {
        return productRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Product Not found"));
    }

    public void deleteProductById(int id) {
         productRepository.deleteById(id);
    }

    @Transactional
    public Product updateProductById(int id, Product product) {
        Product existingProduct = productRepository.findById(id).orElseThrow(()->new RuntimeException(String.valueOf(HttpStatus.NOT_FOUND)));

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setCategory(product.getCategory());

        return productRepository.save(existingProduct);
    }

}
