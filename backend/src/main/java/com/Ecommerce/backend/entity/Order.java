package com.Ecommerce.backend.entity;

import com.Ecommerce.backend.Enum.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Order {

    @Id
    @GeneratedValue
    private long orderID;

    @ManyToOne
    private User user;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private double totalPrice;

    private LocalDateTime createdAt;
}
