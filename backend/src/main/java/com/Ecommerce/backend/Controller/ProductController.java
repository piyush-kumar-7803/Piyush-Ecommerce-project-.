package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Test endpoint
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("The server is on");
    }

    // Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        List<Product> products = productService.getAllProducts();

        return ResponseEntity.ok(products);
    }

    // Add product
    @PostMapping
    public ResponseEntity<Product> addProduct(
            @RequestBody Product product) {

        Product newProduct = productService.addNewProduct(product);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(newProduct);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(
            @PathVariable Long id) {

        Product product = productService.getProductById(id);

        return ResponseEntity.ok(product);
    }

    // Update product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProductById(
            @PathVariable Long id,
            @RequestBody Product product) {

        Product updatedProduct =
                productService.updateProductById(id, product);

        return ResponseEntity.ok(updatedProduct);
    }

    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductById(
            @PathVariable Long id) {

        productService.deleteProductById(id);

        return ResponseEntity.ok(
                "Product deleted successfully"
        );
    }
}


