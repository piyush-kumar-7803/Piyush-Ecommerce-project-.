package com.Ecommerce.backend.Dto.Cart;

import java.math.BigDecimal;

public class CartItemResponse {
    private Long productId;

    private String productName;

    private BigDecimal price;

    private Integer quantity;

    private BigDecimal totalPrice;
}
