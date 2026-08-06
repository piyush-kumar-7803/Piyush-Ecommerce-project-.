package com.Ecommerce.backend.service;

import com.Ecommerce.backend.Dto.Order.OrderItemResponse;
import com.Ecommerce.backend.Dto.Order.OrderResponse;
import com.Ecommerce.backend.Enum.OrderStatus;
import com.Ecommerce.backend.Exception.BadRequestException;
import com.Ecommerce.backend.Exception.ResourceNotFoundException;
import com.Ecommerce.backend.entity.*;
import com.Ecommerce.backend.repo.CartRepository;
import com.Ecommerce.backend.repo.OrderRepository;
import com.Ecommerce.backend.repo.ProductRepository;
import com.Ecommerce.backend.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
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


        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());
        order.setTotalPrice(BigDecimal.ZERO);

        List<CartItem> cartItems = userCart.getCartItems();
        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            int quantity = cartItem.getQuantity();

            if (product.getStock() < quantity) {
                throw new BadRequestException(
                        product.getName() + " is out of stock");
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(quantity);
            orderItem.setPrice(product.getPrice());

            order.addOrderItem(orderItem);

            BigDecimal total = BigDecimal.ZERO;
            BigDecimal itemTotal =
                    product.getPrice().multiply(
                            BigDecimal.valueOf(quantity));

            total = total.add(itemTotal);
            order.setTotalPrice(total);

            product.setStock(product.getStock() - quantity);

            productRepository.save(product);


            cartRepository.save(userCart);


        }
        orderRepository.save(order);
        userCart.getCartItems().clear();
        return mapToOrderResponse(order);
    }

    public List<OrderResponse> getOrders(Long userId) {

        userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id " + userId));

        List<Order> orders = orderRepository.findByUserUserId(userId);

        List<OrderResponse> responses = new ArrayList<>();

        for (Order order : orders) {
            responses.add(mapToOrderResponse(order));
        }

        return responses;
    }

    public OrderResponse getOrderById(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found with id " + orderId));

        return mapToOrderResponse(order);
    }

    public OrderResponse cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found with id " + orderId));
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Order is already cancelled.");
        }
        if (order.getStatus() == OrderStatus.DELIVERED) {
            throw new BadRequestException("Delivered orders cannot be cancelled.");
        }
        for (OrderItem item : order.getOrderItems()) {

            Product product = item.getProduct();

            product.setStock(product.getStock() + item.getQuantity());

            productRepository.save(product);
        }
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return mapToOrderResponse(order);

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
