package com.Ecommerce.backend.service;

import com.Ecommerce.backend.Dto.Order.OrderItemResponse;
import com.Ecommerce.backend.Dto.Order.OrderResponse;
import com.Ecommerce.backend.Enum.OrderStatus;
import com.Ecommerce.backend.Exception.BadRequestException;
import com.Ecommerce.backend.Exception.ResourceNotFoundException;
import com.Ecommerce.backend.entity.Cart;
import com.Ecommerce.backend.entity.Order;
import com.Ecommerce.backend.entity.OrderItem;
import com.Ecommerce.backend.entity.User;
import com.Ecommerce.backend.repo.CartRepository;
import com.Ecommerce.backend.repo.OrderRepository;
import com.Ecommerce.backend.repo.ProductRepository;
import com.Ecommerce.backend.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderResponse placeOrder(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User cannot be found"));

        Cart userCart = cartRepository.findByUser_userId(userId).orElseThrow(() -> new ResourceNotFoundException("user cart cant be found"));
        if (userCart.getCartItems().isEmpty()) {
            throw new BadRequestException("Cart is empty.");
        }

        return null;
    }

    public List<OrderResponse> getOrders(Long userId) {
        // TODO
        return null;
    }

    public OrderResponse getOrderById(Long orderId) {
        // TODO
        return null;
    }

    public OrderResponse cancelOrder(Long orderId) {
        // TODO
        return null;
    }

    public OrderResponse updateOrderStatus(Long orderId, OrderStatus status) {
        // TODO
        return null;
    }

    private OrderResponse mapToOrderResponse(Order order) {
        // TODO
        return null;
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem item) {
        // TODO
        return null;
    }
}
