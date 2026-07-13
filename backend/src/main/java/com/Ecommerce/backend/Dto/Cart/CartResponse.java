package com.Ecommerce.backend.Dto.Cart;

import java.math.BigDecimal;
import java.util.List;

public class CartResponse {
    private Long cartId;

    private List<CartItemResponse> items;

    private BigDecimal grandTotal;
}
