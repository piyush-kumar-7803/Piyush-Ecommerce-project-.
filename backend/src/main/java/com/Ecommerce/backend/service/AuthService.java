package com.Ecommerce.backend.service;

import com.Ecommerce.backend.Dto.Auth.AuthResponse;
import com.Ecommerce.backend.Dto.Auth.LoginRequest;
import com.Ecommerce.backend.Dto.Auth.RegisterRequest;
import com.Ecommerce.backend.Enum.Role;
import com.Ecommerce.backend.Exception.BadRequestException;
import com.Ecommerce.backend.Security.JwtService;
import com.Ecommerce.backend.entity.User;
import com.Ecommerce.backend.repo.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email is already registered");
        }

        // Create user
        User user = new User();

        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());

        // Encrypt password
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setPhoneNumber(request.getPhoneNumber());

        // New users are USER by default
        user.setRole(Role.USER);

        user.setCreatedAt(LocalDate.now());
        user.setUpdatedAt(LocalDate.now());

        // Save user
        userRepository.save(user);

        // Generate JWT
        String token = jwtService.generateToken(
                org.springframework.security.core.userdetails.User
                        .withUsername(user.getEmail())
                        .password(user.getPassword())
                        .authorities("ROLE_" + user.getRole().name())
                        .build()
        );

        return new AuthResponse(
                token,
                user.getUserName(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    public AuthResponse login(LoginRequest request) {

        // Authenticate email + password
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        // Get authenticated user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new BadRequestException("User not found"));

        // Generate JWT
        String token = jwtService.generateToken(
                (org.springframework.security.core.userdetails.User)
                        authentication.getPrincipal()
        );

        return new AuthResponse(
                token,
                user.getUserName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
