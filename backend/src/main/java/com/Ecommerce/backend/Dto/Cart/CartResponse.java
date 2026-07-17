package com.Ecommerce.backend.Dto.Cart;

import com.Ecommerce.backend.entity.Cart;

import java.math.BigDecimal;
import java.util.List;

public class CartResponse {
    private Long cartId;

    private List<CartItemResponse> items;

    private BigDecimal grandTotal;

    public CartResponse(Cart cart) {
        this.cartId = cart.getCartId();

        // 1. Map the list of CartItem entities to CartItemResponse DTOs
        this.items = cart.getItems().stream()
                .map(CartItemResponse::new) // Assumes CartItemResponse has a similar constructor
                .toList();

        // 2. Map the total (adjust depending on how your Cart entity calculates it)
        this.grandTotal = cart.getGrandTotal();
    }
}
