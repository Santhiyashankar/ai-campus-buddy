package com.example.demo.dto;

public record LeaderboardDto(
        String name,
        int points,
        int streak
) {}
