package com.Ecommerce.backend.Dto.Cart;

import com.Ecommerce.backend.entity.CartItem;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class CartItemResponse {
    private Long productId;

    private String productName;

    private String imageUrl;

    private BigDecimal price;

    private Integer quantity;

    private BigDecimal totalPrice;


    public CartItemResponse(CartItem item) {
        this.productId = item.getProduct().getProductId();
        this.productName = item.getProduct().getName();
        this.imageUrl = item.getProduct().getImageUrl();
        this.quantity = item.getQuantity();
        this.price = item.getProduct().getPrice();
        this.totalPrice = this.price.multiply(BigDecimal.valueOf(this.quantity));
    }

}
