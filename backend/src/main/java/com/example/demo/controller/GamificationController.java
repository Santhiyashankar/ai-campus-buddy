package com.example.demo.controller;

import com.example.demo.dto.LeaderboardDto;
import com.example.demo.model.AppUser;
import com.example.demo.model.Badge;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.service.GamificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/req/gamification")
@RequiredArgsConstructor
public class GamificationController {

    private final GamificationService service;
    private final AppUserRepository userRepository;

    // 🏅 Badges (READ ONLY)
    @GetMapping("/badges/{email}")
    public List<Badge> getBadges(@PathVariable String email) {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return service.getUserBadges(user);
    }

    // 📊 Progress summary (READ ONLY)
    @GetMapping("/progress/{email}")
    public ProgressResponse getProgress(@PathVariable String email) {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ProgressResponse(
                user.getPoints(),
                user.getStreak(),
                service.getUserBadges(user).size()
        );
    }

    // 🏆 Leaderboard
    @GetMapping("/leaderboard")
    public List<LeaderboardDto> leaderboard() {
        return service.getLeaderboard();
    }

    record ProgressResponse(int points, int streak, int badges) {}
}
