package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.entity.Cart;
import com.Ecommerce.backend.entity.CartItem;
import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.entity.User;
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


    @PostMapping("/api/cart/items")
    public ResponseEntity<CartItem> addToCart (Long productId, int quantity, User user){
        return new ResponseEntity<>(cartService.addToCart(productId,quantity,user),HttpStatus.CREATED);


    }


}
