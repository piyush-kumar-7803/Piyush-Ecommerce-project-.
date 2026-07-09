package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.entity.Cart;
import com.Ecommerce.backend.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {

    CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/api/carts")
    public ResponseEntity<Cart> addCart(@RequestBody Cart cart) {
        Cart newCart = cartService.addCart(cart);
        return new ResponseEntity<>(newCart, HttpStatus.CREATED);
    }

    @GetMapping("/api/Carts")
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> cart = cartService.getAllCarts();
        return new ResponseEntity<>(cart, HttpStatus.FOUND);
    }

    @GetMapping("/api/Carts/{Id}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long Id) {
        Cart cart = cartService.getCartById(Id);
        return new ResponseEntity<>(cart, HttpStatus.OK);

    }



    @DeleteMapping("/api/Carts/{id}")
    public ResponseEntity<String> deleteCartById(@PathVariable Long id) {
        cartService.deleteCartById(id);
        return ResponseEntity.ok("Cart Deleted successfully");
    }
}
