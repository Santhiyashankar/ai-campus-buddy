package com.example.demo.service;

import com.example.demo.dto.ProgressDto;
import com.example.demo.model.AppUser;
import com.example.demo.model.Task;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final AppUserRepository userRepository;
    private final GamificationService gamificationService;// needed to update points

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Task task) {
        task.setUpdatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    public List<Task> getTasksForUser(AppUser user) {
        return taskRepository.findByUser(user);
    }

    public List<Task> getTasksForToday(AppUser user) {
        LocalDateTime start = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime end = start.plusDays(1);
        return taskRepository.findByUserAndDeadlineBetween(user, start, end);
    }

    public Task completeTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.isCompleted()) {
            task.setCompleted(true);
            task.setCompletedDate(LocalDateTime.now().toLocalDate());
            taskRepository.save(task);

            // ✅ Add points to user
            AppUser user = task.getUser();
            user.setPoints(user.getPoints() + 10);
            gamificationService.checkAndAwardBadges(user);// 10 points per task
            userRepository.save(user);

        }

        return task;
    }

    public ProgressDto getProgress(AppUser user) {
        List<Task> tasks = taskRepository.findByUser(user);
        int totalTasks = tasks.size();
        int completedTasks = (int) tasks.stream().filter(Task::isCompleted).count();

        // Calculate streak (consecutive days with completed tasks)
        List<LocalDate> completedDates = tasks.stream()
                .filter(Task::isCompleted)
                .map(Task::getCompletedDate)
                .filter(d -> d != null)
                .sorted(Comparator.reverseOrder()) // latest first
                .toList();

        int streak = 0;
        LocalDate today = LocalDate.now();
        for (LocalDate date : completedDates) {
            if (date.equals(today.minusDays(streak))) {
                streak++;
            } else {
                break;
            }
        }

        return new ProgressDto(streak, completedTasks, totalTasks);
    }
}
