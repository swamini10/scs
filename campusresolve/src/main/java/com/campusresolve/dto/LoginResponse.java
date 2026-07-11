package com.campusresolve.dto;

import com.campusresolve.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private Long id;
    private String fullName;
    private String email;
    private Role role;
    private String token;
    private String message;

}
