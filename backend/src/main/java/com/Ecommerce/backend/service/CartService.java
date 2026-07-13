package com.Ecommerce.backend.service;

import com.Ecommerce.backend.entity.Cart;
import com.Ecommerce.backend.entity.CartItem;
import com.Ecommerce.backend.entity.Product;
import com.Ecommerce.backend.entity.User;
import com.Ecommerce.backend.repo.CartItemRepository;
import com.Ecommerce.backend.repo.CartRepository;
import com.Ecommerce.backend.repo.ProductRepository;
import com.Ecommerce.backend.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final ProductRepository productRepository;

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public CartService (ProductRepository productRepository, CartRepository cartRepository, CartItemRepository cartItemRepository, UserRepository userRepository){
        this.productRepository = productRepository;
        this.cartRepository =cartRepository;

        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }


    @Transactional
    public CartItem addToCart(Long productId, Integer quantity, Long userId) {

        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("not found"));
        Cart cart =cartRepository.findByUserId(userId).orElseGet(()-> {Cart newCart = new Cart(); newCart.setUser(user); return cartRepository.save(newCart);});

        Product product = productRepository.findById(productId).orElseThrow(()->new RuntimeException("not found"));

          Optional<CartItem> optionalItem = cartItemRepository.findByCartAndProduct(cart,product);
          CartItem item;
        if (optionalItem.isPresent()){
            item = optionalItem.get();
            item.setQuantity(item.getQuantity()+quantity);
        }
        else{

            item = new CartItem();

            item.setCart(cart);

            item.setProduct(product);

            item.setQuantity(quantity);

        }
        return cartItemRepository.save(item);

    }
}

