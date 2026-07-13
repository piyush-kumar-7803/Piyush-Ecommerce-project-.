package com.Ecommerce.backend.Dto.Product;

import com.Ecommerce.backend.Dto.Category.CategoryResponse;

import java.math.BigDecimal;

public class ProductResponse {
    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stock;

    private String imageUrl;

    private CategoryResponse category;
}
