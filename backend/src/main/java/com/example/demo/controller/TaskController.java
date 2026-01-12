package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.model.Task;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/req/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final AppUserRepository userRepository;

    @PostMapping
    public Task create(@RequestBody Task task) {
        AppUser user = userRepository.findByEmail(task.getUser().getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);
        return taskService.createTask(task);
    }

    @GetMapping("/{email}")
    public List<Task> getUserTasks(@PathVariable String email) {
        AppUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskService.getTasksForUser(user);
    }

    @PutMapping("/{taskId}")
    public Task update(@PathVariable Long taskId, @RequestBody Task updatedTask) {
        updatedTask.setId(taskId);
        return taskService.updateTask(updatedTask);
    }

    @DeleteMapping("/{taskId}")
    public void delete(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
    }

    @PutMapping("/{taskId}/complete")
    public Task complete(@PathVariable Long taskId) {
        return taskService.completeTask(taskId);
    }
}
