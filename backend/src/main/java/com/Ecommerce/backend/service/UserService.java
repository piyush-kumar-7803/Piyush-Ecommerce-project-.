package com.Ecommerce.backend.service;


import com.Ecommerce.backend.entity.User;

import com.Ecommerce.backend.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService (UserRepository userRepository){
        this.userRepository =userRepository;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long Id) {
        return userRepository.findById(Id).orElseThrow(()-> new RuntimeException("User with Id = " + Id +" not Found"));
    }

    @Transactional
    public User updateById(User user , Long Id) {
        User existingUser = userRepository.findById(Id).orElseThrow(()->new RuntimeException("Cant Update"));

        existingUser.setUserName(user.getUserName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        return userRepository.save(existingUser);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

}