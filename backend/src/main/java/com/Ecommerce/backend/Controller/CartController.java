package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.Dto.Cart.CartResponse;
import com.Ecommerce.backend.Dto.Cart.UpdateCartItemRequest;
import com.Ecommerce.backend.entity.CartItem;
import com.Ecommerce.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController {

    CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    @PostMapping("/api/cart/items")
    public ResponseEntity<CartItem> addToCart(@RequestParam Long productId, @Valid @RequestParam int quantity, @RequestParam Long userId) {
        return new ResponseEntity<>(cartService.addToCart(productId, quantity, userId), HttpStatus.CREATED);


    }

    @GetMapping("/api/cart")
    public ResponseEntity<CartResponse> getCart(@RequestParam Long userId) {
        CartResponse Cart = cartService.getCart(userId);

        return new ResponseEntity<>(Cart, HttpStatus.OK);
    }

    @PutMapping("/api/cart/items/{productId}")
    public ResponseEntity<CartResponse> changeQuantity(@RequestBody UpdateCartItemRequest updateCartItemRequest, @PathVariable Long productId, @RequestParam Long userId) {
        CartResponse cartResponse = cartService.changeQuantity(updateCartItemRequest, productId, userId);
        return new ResponseEntity<>(cartResponse, HttpStatus.ACCEPTED);

    }


}
