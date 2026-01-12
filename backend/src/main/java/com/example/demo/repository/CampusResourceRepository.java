package com.example.demo.repository;

import com.example.demo.model.CampusResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampusResourceRepository extends JpaRepository<CampusResource, Long> {

    List<CampusResource> findByStatus(String status);

    List<CampusResource> findByType(String type);

    List<CampusResource> findByIsAvailable(Boolean isAvailable);
}
