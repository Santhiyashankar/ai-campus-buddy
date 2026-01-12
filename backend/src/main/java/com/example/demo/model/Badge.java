package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "badges")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // e.g., "Consistency Starter"
    private String description; // e.g., "3-day streak achieved"

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
}
