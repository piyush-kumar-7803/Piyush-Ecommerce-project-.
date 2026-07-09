package com.Ecommerce.backend.service;

import com.Ecommerce.backend.entity.Cart;
import com.Ecommerce.backend.repo.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    CartRepository cartRepository;

    public CartService (CartRepository cartRepository){
        this.cartRepository =cartRepository;
    }

    public Cart addCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Cart getCartById(Long Id) {
        return cartRepository.findById(Id).orElseThrow(()-> new RuntimeException("Cart with Id = " + Id +" not Found"));
    }



    public void deleteCartById(Long id) {
        cartRepository.deleteById(id);
    }

}
