package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.Dto.User.UserResponse;
import com.Ecommerce.backend.entity.User;
import com.Ecommerce.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        List<UserResponse> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Long id) {

        UserResponse user = userService.getUserById(id);

        return ResponseEntity.ok(user);
    }

    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateById(
            @RequestBody User user,
            @PathVariable Long id) {

        UserResponse updatedUser = userService.updateById(user, id);

        return ResponseEntity.ok(updatedUser);
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(
            @PathVariable Long id) {

        userService.deleteUserById(id);

        return ResponseEntity.ok("User deleted successfully");
    }
}