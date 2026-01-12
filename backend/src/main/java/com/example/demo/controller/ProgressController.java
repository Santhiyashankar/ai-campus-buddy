package com.example.demo.controller;

import com.example.demo.dto.ProgressDto;
import com.example.demo.model.AppUser;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/req/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final TaskService taskService;
    private final AppUserRepository userRepository;

    @GetMapping("/{email}")
    public ProgressDto getProgress(@PathVariable String email) {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskService.getProgress(user);
    }
}
