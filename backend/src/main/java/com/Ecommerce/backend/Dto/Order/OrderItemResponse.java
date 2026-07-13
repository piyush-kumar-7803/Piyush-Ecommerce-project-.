package com.Ecommerce.backend.Dto.Order;

import java.math.BigDecimal;

public class OrderItemResponse {
    private Long productId;

    private String productName;

    private BigDecimal price;

    private Integer quantity;

    private BigDecimal total;
}
