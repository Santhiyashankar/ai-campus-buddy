package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.repository.AppUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/req")
@CrossOrigin(origins = "http://localhost:5173") // for Vite + React
public class RegistrationController {

    private final AppUserRepository repo;
    private final PasswordEncoder encoder;

    public RegistrationController(AppUserRepository repo,
                                  PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }


    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody AppUser user) {
        try {
            Optional<AppUser> existingUser = repo.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
            }

            user.setPassword(encoder.encode(user.getPassword()));
            user.setVerified(true);
            repo.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).body("Registered successfully!");
        } catch (Exception e) {
            // Catch duplicate key exception from DB
            if (e.getCause() != null && e.getCause().getMessage().contains("duplicate key")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

}
