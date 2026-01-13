package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")

@RequiredArgsConstructor
public class UserController {

    private final AppUserRepository repo;

    @GetMapping("/{email}")
    public UserResponse getUserByEmail(@PathVariable String email) {
        AppUser user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(user.getName(), user.getEmail());
    }

    // DTO (NO password exposure)
    record UserResponse(String name, String email) {}
}
