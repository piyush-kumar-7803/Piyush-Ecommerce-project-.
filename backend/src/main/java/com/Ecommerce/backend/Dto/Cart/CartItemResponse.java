package com.Ecommerce.backend.Dto.Cart;

import com.Ecommerce.backend.entity.CartItem;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class CartItemResponse {
    private final Long productId;

    private final String productName;

    private final String imageUrl;

    private final BigDecimal price;

    private final Integer quantity;

    private final BigDecimal totalPrice;


    public CartItemResponse(CartItem item) {
        this.productId = item.getProduct().getProductId();
        this.productName = item.getProduct().getName();
        this.imageUrl = item.getProduct().getImageUrl();
        this.quantity = item.getQuantity();
        this.price = item.getProduct().getPrice();
        this.totalPrice = this.price.multiply(BigDecimal.valueOf(this.quantity));
    }

}
