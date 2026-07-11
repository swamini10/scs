package com.campusresolve.service;

import java.util.List;

import com.campusresolve.dto.LoginResponse;
import com.campusresolve.dto.RegisterRequest;
import com.campusresolve.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.campusresolve.entity.User;
import com.campusresolve.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // Register User
    public User registerUser(RegisterRequest request) {

        if (request == null) {
            throw new RuntimeException("Request cannot be null");
        }

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
    public LoginResponse login(String email, String password) {

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (password == null || password.trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            throw new RuntimeException("Invalid Email");
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse();

        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setToken(token);
        response.setMessage("Login Successful");

        return response;
    }

    // Get User By Id
    public User getUserById(Long id) {

        if (id == null) {
            throw new RuntimeException("User Id cannot be null");
        }

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return user;
    }

    // Get All Users
    public List<User> getAllUsers() {

        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            throw new RuntimeException("No users found");
        }

        return users;
    }
}