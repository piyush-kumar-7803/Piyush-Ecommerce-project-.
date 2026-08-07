package com.Ecommerce.backend.Controller;


import com.Ecommerce.backend.entity.Category;
import com.Ecommerce.backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // Add category
    @PostMapping
    public ResponseEntity<Category> addCategory(
            @RequestBody Category category) {

        Category newCategory = categoryService.addCategory(category);

        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    // Get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {

        List<Category> categories = categoryService.getAllCategories();

        return ResponseEntity.ok(categories);
    }

    // Get category by ID
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(
            @PathVariable Long id) {

        Category category = categoryService.getCategoryById(id);

        return ResponseEntity.ok(category);
    }

    // Update category
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateById(
            @RequestBody Category category,
            @PathVariable Long id) {

        Category updatedCategory =
                categoryService.updateById(category, id);

        return ResponseEntity.ok(updatedCategory);
    }

    // Delete category
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(
            @PathVariable Long id) {

        categoryService.deleteCategoryById(id);

        return ResponseEntity.ok("Category deleted successfully");
    }
}
