package com.Ecommerce.backend.Dto.Cart;

import com.Ecommerce.backend.entity.Cart;

import java.math.BigDecimal;
import java.util.List;

public class CartResponse {
    private Long cartId;

    private List<CartItemResponse> items;

    private BigDecimal grandTotal;

    public CartResponse(Cart cart) {
        this.cartId = cart.getCartId(); // Changed from getId() to getCartId()

        this.items = cart.getItems().stream()
                .map(CartItemResponse::new)
                .toList(); // If using Java 16+, otherwise use .collect(Collectors.toList())

        this.grandTotal = cart.getGrandTotal();
    }
}
