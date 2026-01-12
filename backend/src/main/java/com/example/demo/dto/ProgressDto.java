package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProgressDto {

    private int streak;          // consecutive days user completed tasks
    private int completedTasks;  // total completed tasks
    private int totalTasks;      // total tasks assigned
}
