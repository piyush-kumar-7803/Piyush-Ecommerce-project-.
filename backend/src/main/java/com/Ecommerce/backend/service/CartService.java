package com.Ecommerce.backend.service;

import com.Ecommerce.backend.entity.Cart;
import com.Ecommerce.backend.entity.CartItem;
import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.entity.User;
import com.Ecommerce.backend.repo.CartItemRepository;
import com.Ecommerce.backend.repo.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final ProductService productService;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    public CartService (CartRepository cartRepository, ProductService productService, CartItemRepository cartItemRepository){
        this.cartRepository =cartRepository;
        this.productService = productService;
        this.cartItemRepository = cartItemRepository;
    }


    @Transactional
    public CartItem addToCart(Long productId, Integer quantity, User user) {
        Product product ;
        Cart cart =cartRepository.findByUserId(user.getUserId()).orElseGet(()-> cartRepository.save(new Cart( user)));
        try {
            product = productService.getProductById(productId);
        } catch (Exception e) {
            throw new RuntimeException("Product not found");
        }

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity( quantity);

        return cartItemRepository.save(cartItem);

    }
}
