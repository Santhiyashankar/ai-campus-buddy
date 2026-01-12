package com.example.demo.controller;

import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/req/stats")
@RequiredArgsConstructor
public class StatsController {

    private final TaskRepository taskRepository;

    @GetMapping("/{email}")
    public Map<String, Object> getStats(@PathVariable String email) {
        int total = taskRepository.countByUserEmail(email);
        int completed = taskRepository.countByUserEmailAndCompletedTrue(email);

        // Example streak calculation: consecutive days with completed tasks
        int streak = calculateStreak(email);

        return Map.of(
                "totalTasks", total,
                "completedTasks", completed,
                "streak", streak
        );
    }

    // Simple example streak calculation
    private int calculateStreak(String email) {
        // TODO: Replace with your own logic
        // For now, let's just return number of consecutive completed tasks in last 7 days
        return taskRepository. findByUserEmail(email).stream()
                .filter(Task::isCompleted)
                .mapToInt(t -> 1)
                .sum();
    }
}
