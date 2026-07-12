package com.Ecommerce.backend.Controller;

import com.Ecommerce.backend.entity.User;

import com.Ecommerce.backend.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/users")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> user = userService.getAllUsers();
        return new ResponseEntity<>(user, HttpStatus.FOUND);
    }

    @GetMapping("/api/users/{Id}")
    public ResponseEntity<User> getUserById(@PathVariable Long Id) {
        User user = userService.getUserById(Id);
        return new ResponseEntity<>(user, HttpStatus.OK);

    }

    @PutMapping("/api/users/{Id}")
    public ResponseEntity<User> updateById(@RequestBody User User,
                                           @PathVariable long Id) {
        User newUser = userService.updateById(User, Id);
        return new ResponseEntity<>(newUser, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("User Deleted successfully");
    }
}