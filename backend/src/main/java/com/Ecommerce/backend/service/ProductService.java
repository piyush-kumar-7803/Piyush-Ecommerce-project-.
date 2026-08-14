package com.Ecommerce.backend.service;


import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.repo.CategoryRepository;
import com.Ecommerce.backend.repo.ProductRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final Cloudinary cloudinary;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            Cloudinary cloudinary) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.cloudinary = cloudinary;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product addNewProduct(Product product, MultipartFile image) {

        try {
            String imageUrl = uploadImage(image);
            product.setImageUrl(imageUrl);

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

        if (image != null && !image.isEmpty()) {
            try {
                String imageUrl = uploadImage(image);
                existingProduct.setImageUrl(imageUrl);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image");
            }
        }

        return productRepository.save(existingProduct);
    }

    private String uploadImage(MultipartFile image) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(
                image.getBytes(),
                ObjectUtils.asMap(
                        "folder", "piyush-store/products"
                )
        );
        return (String) uploadResult.get("secure_url");
    }
}
