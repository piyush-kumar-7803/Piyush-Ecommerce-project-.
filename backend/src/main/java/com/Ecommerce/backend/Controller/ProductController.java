package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> addProduct(
            @RequestPart("product") Product product,
            @RequestPart("image") MultipartFile image) {

        Product newProduct = productService.addNewProduct(product, image);

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
    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Product> updateProductById(
            @PathVariable Long id,
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        Product updatedProduct =
                productService.updateProductById(id, product, image);

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


