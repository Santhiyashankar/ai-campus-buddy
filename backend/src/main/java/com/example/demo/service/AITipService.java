package com.example.demo.service;

import com.example.demo.model.AppUser;
import com.example.demo.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AITipService {

    private final TaskRepository taskRepository;

    public String getTip(AppUser user) {

        List<Long> totalTasks = taskRepository.findByUser(user)
                .stream().map(task -> task.getId()).toList();

        long completedTasks = taskRepository.findByUser(user)
                .stream().filter(task -> task.isCompleted()).count();

        int remaining = totalTasks.size() - (int) completedTasks;

        if (remaining == 0) {
            return "All tasks done! Take a short break 🏖️";
        } else if (remaining <= 2) {
            return "Almost there! Finish " + remaining + " task(s) to boost your streak 🚀";
        } else if (remaining <= 5) {
            return "Keep going! Focus on one task at a time 🔥";
        } else {
            return "Plan your day: Prioritize your top tasks first ✅";
        }
    }
}
