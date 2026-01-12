package com.example.demo.service;

import com.example.demo.dto.LeaderboardDto;
import com.example.demo.model.AppUser;
import com.example.demo.model.Badge;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserBadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GamificationService {

    private final UserBadgeRepository badgeRepository;
    private final TaskRepository taskRepository;
    private final AppUserRepository userRepository;

    // 🟢 Award points on task completion
    public void awardPoints(AppUser user, int points) {
        user.setPoints(user.getPoints() + points);
        userRepository.save(user);
    }

    // 🔥 Calculate streak
    public int calculateStreak(AppUser user) {
        List<LocalDate> dates = taskRepository.findByUser(user)
                .stream()
                .map(t -> t.getCompletedDate())
                .filter(d -> d != null)
                .distinct()
                .sorted()
                .toList();

        int streak = 0;
        LocalDate today = LocalDate.now();

        for (int i = dates.size() - 1; i >= 0; i--) {
            if (dates.get(i).equals(today.minusDays(streak))) {
                streak++;
            } else break;
        }

        user.setStreak(streak);
        userRepository.save(user);
        return streak;
    }

    // 🏅 Badge awarding
    public void checkAndAwardBadges(AppUser user) {
        int streak = calculateStreak(user);

        boolean hasBadge = badgeRepository.findByUser(user)
                .stream()
                .anyMatch(b -> b.getName().equals("Consistency Starter"));

        if (streak >= 3 && !hasBadge) {
            Badge badge = new Badge();
            badge.setUser(user);
            badge.setName("Consistency Starter");
            badge.setDescription("Completed tasks for 3 consecutive days");
            badgeRepository.save(badge);
        }
    }

    public List<Badge> getUserBadges(AppUser user) {
        return badgeRepository.findByUser(user);
    }

    // 🏆 Leaderboard
    public List<LeaderboardDto> getLeaderboard() {
        return userRepository.findAll()
                .stream()
                .sorted((a, b) -> b.getPoints() - a.getPoints())
                .limit(10)
                .map(u -> new LeaderboardDto(
                        u.getName(),
                        u.getPoints(),
                        u.getStreak()
                ))
                .toList();
    }
}
