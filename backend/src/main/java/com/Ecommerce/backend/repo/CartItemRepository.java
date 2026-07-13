package com.Ecommerce.backend.repo;

import com.Ecommerce.backend.entity.Cart;
import com.Ecommerce.backend.entity.CartItem;
import com.Ecommerce.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {


    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}
