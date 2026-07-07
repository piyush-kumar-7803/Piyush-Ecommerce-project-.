package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {


    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> allProducts = productService.getAllProducts();
        return ResponseEntity.ok(allProducts);
    }


    @GetMapping("/")
    public String greet(){
        return "started mate";
    }
}
