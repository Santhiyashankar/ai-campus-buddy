package com.example.demo.repository;

import com.example.demo.model.AppUser;
import com.example.demo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser(AppUser user);

    List<Task> findByUserAndDeadlineBetween(AppUser user, LocalDateTime start, LocalDateTime end);

    int countByUserEmail(String email);

    int countByUserEmailAndCompletedTrue(String email);


    List<Task> findByUserEmail(String email);
}
