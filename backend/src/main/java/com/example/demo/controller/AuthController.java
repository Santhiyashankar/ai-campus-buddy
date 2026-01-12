package com.example.demo.controller;

import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.AppUser;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.utils.JwtTokenUtil;

import java.util.Optional;

@RestController
@RequestMapping("/req")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authManager;
    private final AppUserRepository repo;

    public AuthController(AuthenticationManager authManager, AppUserRepository repo) {
        this.authManager = authManager;
        this.repo = repo;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = null;
        AppUser user = null;
        try {
            // 1️⃣ Authenticate credentials
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            // 2️⃣ Fetch user safely
            user = repo.findByEmail(request.getEmail())
                    .orElseThrow(() ->
                            new BadCredentialsException("Invalid credentials"));

            // 3️⃣ Generate JWT
            token = JwtTokenUtil.generateToken(user.getEmail());

            return ResponseEntity.ok(
                    new LoginResponse(
                            token,
                            user.getEmail(),
                            user.getName()
                    )
            );

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED) .body("Invalid credentials");
        }
    }

    // DTO classes
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginResponse {
        private String token;
        private String email;
        private String name;

        // ✅ CORRECT constructor (3 args)
        public LoginResponse(String token, String email, String name) {
            this.token = token;
            this.email = email;
            this.name = name;
        }

        public String getToken() { return token; }
        public String getEmail() { return email; }
        public String getName() { return name; }
    }

}
