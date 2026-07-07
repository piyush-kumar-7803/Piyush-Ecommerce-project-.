package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class ProductController {


    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }


    @GetMapping("/")
    public String greet(){
        return "started mate";
    }
}
