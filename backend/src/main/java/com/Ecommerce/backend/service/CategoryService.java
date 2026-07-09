package com.Ecommerce.backend.service;


import com.Ecommerce.backend.entity.Category;
import com.Ecommerce.backend.repo.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    CategoryRepository categoryRepository;

    public CategoryService (CategoryRepository categoryRepository){
        this.categoryRepository =categoryRepository;
    }

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long Id) {
        return categoryRepository.findById(Id).orElseThrow(()-> new RuntimeException("Category with Id = " + Id +" not Found"));
    }

    public Category updateById(Category category , Long Id) {
        Category existingCategory = categoryRepository.findById(Id).orElseThrow(()->new RuntimeException("Cant Update"));

        existingCategory.setCategoryName(category.getCategoryName());
        existingCategory.setCategoryDescription(category.getCategoryDescription());
        return categoryRepository.save(existingCategory);
    }
}
