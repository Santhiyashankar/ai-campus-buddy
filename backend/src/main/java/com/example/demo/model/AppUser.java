package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "app_users",
        uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)  // ✅ Make email unique
    private String email;

    @Column(nullable = false)
    private String password;

    private String name;

    private boolean verified;
    private String interests;       // e.g. "AI, ML, Web Dev"
    private String availability;    // e.g. "Morning", "Evening"

    // Preferences
    private String theme = "LIGHT"; // LIGHT / DARK
    private boolean aiPersonalization = true;
    // AppUser.java
    @Column(nullable = false)
    private Integer points = 0;

    @Column(nullable = false)
    private Integer streak = 0;


}
