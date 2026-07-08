package com.Ecommerce.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OrderItem {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private Order order;

    @ManyToOne
    private Product product;

    private int Quantity;

    private double price;
}
