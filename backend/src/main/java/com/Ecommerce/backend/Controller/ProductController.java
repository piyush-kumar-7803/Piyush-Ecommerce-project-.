package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {


    private final ProductService productService;


    public ProductController(ProductService productService){

        this.productService = productService;
    }

    @GetMapping("/api")
    public String greet(){
        return "The server is on";
    }

    @GetMapping("/api/products")
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> allProducts = productService.getAllProducts();
        return ResponseEntity.ok(allProducts);
    }

    @PostMapping("/api/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){

        Product newProduct = productService.addNewProduct(product);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);

    }
    @GetMapping("/api/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        Product product = productService.getProductById(id);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }
        @DeleteMapping("/api/products/{id}")
        public ResponseEntity<String> deleteProductById(@PathVariable Long id){
             productService.deleteProductById(id);
            return  ResponseEntity.ok( "Product Deleted successfullly");
        }

        @PutMapping("/api/products/{Id}")
        public ResponseEntity<Product> updateProductById(@PathVariable Long Id ,
                                                         @RequestBody Product product)
        {
        Product newProduct = productService.updateProductById(Id,product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        }



}


