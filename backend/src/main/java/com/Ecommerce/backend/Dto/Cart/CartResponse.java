package com.Ecommerce.backend.Dto.Cart;

import com.Ecommerce.backend.entity.Cart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {

    private Long cartId;

    private List<CartItemResponse> items;

    private BigDecimal grandTotal;

    public CartResponse(Cart cart) {

        this.cartId = cart.getCartId();

        this.items = cart.getCartItems()
                .stream()
                .map(CartItemResponse::new)
                .toList();

        this.grandTotal = cart.getGrandTotal();
    }
}
