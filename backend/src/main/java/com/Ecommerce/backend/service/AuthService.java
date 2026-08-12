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
import org.springframework.security.core.userdetails.UserDetails;
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


    // =========================
    // REGISTER
    // =========================

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email is already registered");
        }

        User user = new User();

        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(Role.USER);
        user.setCreatedAt(LocalDate.now());
        user.setUpdatedAt(LocalDate.now());

        userRepository.save(user);

        UserDetails userDetails =
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        java.util.List.of(
                                new org.springframework.security.core.authority.SimpleGrantedAuthority(
                                        "ROLE_" + user.getRole().name()
                                )
                        )
                );

        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(
                token,
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getRole().name()
        );
    }


    // =========================
    // LOGIN
    // =========================

    public AuthResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        User user =
                userRepository.findByEmail(request.getEmail())
                        .orElseThrow(() -> new BadRequestException("User not found"));

        String token =
                jwtService.generateToken(
                        (org.springframework.security.core.userdetails.User)
                                authentication.getPrincipal()
                );

        return new AuthResponse(
                token,
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}