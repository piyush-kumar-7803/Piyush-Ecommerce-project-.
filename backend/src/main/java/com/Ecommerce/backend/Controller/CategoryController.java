package com.Ecommerce.backend.Controller;


import com.Ecommerce.backend.entity.Category;
import com.Ecommerce.backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService=categoryService;
    }

    @PostMapping("/api/categories")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
       Category newCategory = categoryService.addCategory(category);
       return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @GetMapping("/api/categories")
    public ResponseEntity<List<Category>> getAllCategories(){
        List<Category> category = categoryService.getAllCategories();
        return  new ResponseEntity<>(category,HttpStatus.FOUND);
    }

    @GetMapping("/api/categories/{Id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long Id){
        Category category =categoryService.getCategoryById(Id);
        return new ResponseEntity<>(category,HttpStatus.OK);

    }

    @PutMapping("/api/categories/{Id}")
    public ResponseEntity<Category> updateById(@RequestBody Category category,
                                               @PathVariable long Id){
        Category newCategory = categoryService.updateById(category, Id);
        return new ResponseEntity<>(category,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/categories/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable Long id){
        categoryService.deleteCategoryById(id);
        return  ResponseEntity.ok( "category Deleted successfully");
    }
}
