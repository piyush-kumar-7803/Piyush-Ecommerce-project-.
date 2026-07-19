package com.Ecommerce.backend.service;

import com.Ecommerce.backend.Dto.Cart.CartResponse;
import com.Ecommerce.backend.Dto.Cart.UpdateCartItemRequest;
import com.Ecommerce.backend.entity.Cart;
import com.Ecommerce.backend.entity.CartItem;
import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.entity.User;
import com.Ecommerce.backend.repo.CartItemRepository;
import com.Ecommerce.backend.repo.CartRepository;
import com.Ecommerce.backend.repo.ProductRepository;
import com.Ecommerce.backend.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    private final ProductRepository productRepository;

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public CartService(ProductRepository productRepository, CartRepository cartRepository, CartItemRepository cartItemRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;

        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CartResponse getCart(Long userId) {

        Cart cart = cartRepository.findByUser_userId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("not found"));
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
        return new CartResponse(cart);

    }


    @Transactional
    public CartItem addToCart(Long productId, Integer quantity, Long userId) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> optionalItem = cartItemRepository.findByCartAndProduct(cart, product);
        CartItem item;
        if (optionalItem.isPresent()) {
            item = optionalItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
        }
        return cartItemRepository.save(item);
    }

    @Transactional
    public CartResponse changeQuantity(UpdateCartItemRequest updateCartItemRequest, Long productId, Long userId) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> optionalItem = cartItemRepository.findByCartAndProduct(cart, product);
        CartItem item;
        if (optionalItem.isPresent()) {
            item = optionalItem.get();
            item.setQuantity(updateCartItemRequest.getQuantity());
        } else {
            item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(updateCartItemRequest.getQuantity());
        }
        cartItemRepository.save(item);

        return new CartResponse(cart);
    }

    private Cart getOrCreateCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartRepository.findByUser_userId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });
    }
}

