package com.Ecommerce.backend.Dto.Product;

import java.math.BigDecimal;

public class ProductRequest {
    private String name;

    private String description;

    private BigDecimal price;

    private Integer stock;

    private Long categoryId;

    private String imageUrl;
}
