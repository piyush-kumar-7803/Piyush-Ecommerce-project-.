package com.Ecommerce.backend.service;


import com.Ecommerce.backend.repo.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    CategoryRepository categoryRepository;

    public CategoryService (CategoryRepository categoryRepository){
        this.categoryRepository =categoryRepository;
    }
}
