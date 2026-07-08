package com.campusresolve.service;

import java.util.List;

import com.campusresolve.dto.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusresolve.entity.User;
import com.campusresolve.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    // Login User
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }

    // Get User By Id
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Get All Users
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

}