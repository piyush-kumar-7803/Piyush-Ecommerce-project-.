package com.Ecommerce.backend.Dto.Cart;

import com.Ecommerce.backend.entity.CartItem;

import java.math.BigDecimal;

public class CartItemResponse {
    private Long productId;

    private String productName;

    private BigDecimal price;

    private Integer quantity;

    private BigDecimal totalPrice;


        public CartItemResponse(CartItem item) {
            this.productId = item.getProduct().getProductId(); // check your Product ID field name
            this.productName = item.getProduct().getName();     // check your Product Name field name
            this.quantity = item.getQuantity();
            this.price = item.getProduct().getPrice();
        }

}
