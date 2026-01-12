package com.example.demo.repository;

import com.example.demo.model.Badge;
import com.example.demo.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface
UserBadgeRepository extends JpaRepository<Badge, Long> {
    List<Badge> findByUser(AppUser user);
}
