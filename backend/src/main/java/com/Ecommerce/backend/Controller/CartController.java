package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.Dto.Cart.CartResponse;
import com.Ecommerce.backend.Dto.Cart.UpdateCartItemRequest;
import com.Ecommerce.backend.service.CartService;
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
    public ResponseEntity<CartResponse> addToCart(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @RequestParam Long userId) {

        cartService.addToCart(productId, quantity, userId);

        CartResponse cart = cartService.getCart(userId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(cart);
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

    @DeleteMapping("/api/cart/items/{productId}")
    public ResponseEntity<CartResponse> removeProduct(@PathVariable Long productId, @RequestParam Long userId) {
        CartResponse cartResponse = cartService.removeProduct(productId, userId);
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);

    }

    @DeleteMapping("/api/cart")
    public ResponseEntity<CartResponse> emptyCart(@RequestParam Long userId) {
        CartResponse cartResponse = cartService.emptyCart(userId);
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);
    }


}
