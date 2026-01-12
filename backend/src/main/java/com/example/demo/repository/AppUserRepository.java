package com.example.demo.repository;

import com.example.demo.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    // Exact user by email
    Optional<AppUser> findByEmail(String email);

    // Ignore case for collaboration requests
    Optional<AppUser> findByEmailIgnoreCase(String email);
}
