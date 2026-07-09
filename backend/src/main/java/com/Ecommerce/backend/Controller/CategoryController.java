package com.Ecommerce.backend.Controller;


import com.Ecommerce.backend.entity.Category;
import com.Ecommerce.backend.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {

    CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService=categoryService;
    }

}
