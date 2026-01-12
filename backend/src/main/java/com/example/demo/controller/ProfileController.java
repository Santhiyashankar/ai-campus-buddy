package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/req/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final AppUserRepository userRepository;

    @GetMapping("/{email}")
    public AppUser getProfile(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/update")
    public AppUser updateProfile(@RequestBody AppUser updatedUser) {
        AppUser user = userRepository.findByEmail(updatedUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(updatedUser.getName());
        user.setInterests(updatedUser.getInterests());
        user.setAvailability(updatedUser.getAvailability());
        user.setTheme(updatedUser.getTheme());
        user.setAiPersonalization(updatedUser.isAiPersonalization());

        return userRepository.save(user);
    }
}
