package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "campus_resources")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampusResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private String room;

    private String floor;

    private String location;

    private Double latitude;

    private Double longitude;

    @Column(name = "is_available")
    private Boolean isAvailable;

    private String status;
}
