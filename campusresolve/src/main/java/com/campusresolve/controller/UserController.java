package com.campusresolve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.campusresolve.dto.RegisterRequest;
import com.campusresolve.dto.LoginRequest;
import com.campusresolve.entity.User;
import com.campusresolve.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // Register User
    @PostMapping("/register")
    public User registerUser(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);

    }

    // Login User
    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());

    }

    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    // Get User By Id
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);

    }

}