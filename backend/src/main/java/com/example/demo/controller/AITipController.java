package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.service.AITipService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/req/ai")
@RequiredArgsConstructor
public class AITipController {

    private final AITipService aiService;
    private final AppUserRepository userRepository;

    @GetMapping("/tip/{email}")
    public TipResponse getTip(@PathVariable String email) {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String tip = aiService.getTip(user);
        return new TipResponse(tip);
    }

    // Simple DTO for response
    record TipResponse(String tip) {}
}
