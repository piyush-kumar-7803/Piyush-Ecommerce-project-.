package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.Dto.Order.OrderResponse;
import com.Ecommerce.backend.Dto.Order.UpdateOrderStatusRequest;
import com.Ecommerce.backend.Enum.OrderStatus;
import com.Ecommerce.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Checkout
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @RequestParam Long userId) {

        OrderResponse response = orderService.placeOrder(userId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    // Get all orders of a user
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrders(
            @RequestParam Long userId) {

        return ResponseEntity.ok(orderService.getOrders(userId));
    }

    // Get one order
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    // Cancel Order
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponse> cancelOrder(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(orderService.cancelOrder(orderId));
    }

    // Admin (Later)
    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody UpdateOrderStatusRequest request) {

        OrderStatus status = OrderStatus.valueOf(request.getStatus().toUpperCase());

        return ResponseEntity.ok(
                orderService.updateOrderStatus(orderId, status)
        );
    }
}