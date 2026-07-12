package com.Ecommerce.backend.repo;

import com.Ecommerce.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
