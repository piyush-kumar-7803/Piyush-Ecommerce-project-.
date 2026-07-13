package com.Ecommerce.backend.Dto.Order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Long orderId;

    private LocalDateTime orderDate;

    private String status;

    private BigDecimal totalAmount;

    private List<OrderItemResponse> items;
}
