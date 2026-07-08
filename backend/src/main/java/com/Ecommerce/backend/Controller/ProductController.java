package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {


    private final ProductService productService;


    public ProductController(ProductService productService){

        this.productService = productService;
    }

    @GetMapping("/")
    public String greet(){
        return "The server is on";
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> allProducts = productService.getAllProducts();
        return ResponseEntity.ok(allProducts);
    }

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){

        Product newProduct = productService.addNewProduct(product);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);

    }




}


