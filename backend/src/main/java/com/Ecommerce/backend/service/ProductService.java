package com.Ecommerce.backend.service;


import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.repo.CategoryRepository;
import com.Ecommerce.backend.repo.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;


@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final String uploadDir = "uploads/products/";

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addNewProduct(Product product, MultipartFile image) {

        try {

            File directory = new File(uploadDir);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            String originalName = image.getOriginalFilename();

            String fileName =
                    UUID.randomUUID() + "_" + originalName;

            Path filePath =
                    Paths.get(uploadDir).resolve(fileName);

            Files.copy(
                    image.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            product.setImageUrl("/images/products/" + fileName);

            return productRepository.save(product);

        } catch (IOException e) {

            throw new RuntimeException("Failed to upload image");
        }
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));
    }

    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public Product updateProductById(
            Long id,
            Product product,
            MultipartFile image) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setCategory(product.getCategory());

        // Update image only if a new image was provided
        if (image != null && !image.isEmpty()) {
            try {
                File directory = new File(uploadDir);

                if (!directory.exists()) {
                    directory.mkdirs();
                }

                String originalName = image.getOriginalFilename();

                String fileName =
                        UUID.randomUUID() + "_" + originalName;

                Path filePath =
                        Paths.get(uploadDir).resolve(fileName);

                Files.copy(
                        image.getInputStream(),
                        filePath,
                        StandardCopyOption.REPLACE_EXISTING
                );

                existingProduct.setImageUrl(
                        "/images/products/" + fileName
                );

            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image");
            }
        }

        return productRepository.save(existingProduct);
    }
}
