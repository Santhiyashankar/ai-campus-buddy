package com.example.demo.controller;

import com.example.demo.model.CampusResource;
import com.example.demo.service.CampusResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/req/campus-resources")
@RequiredArgsConstructor

public class CampusResourceController {

    private final CampusResourceService campusResourceService;

    @GetMapping
    public List<CampusResource> getAllResources() {
        return campusResourceService.getAllResources();
    }

    @GetMapping("/{id}")
    public CampusResource getById(@PathVariable Long id) {
        return campusResourceService.getResourceById(id);
    }

    @PostMapping
    public CampusResource create(@RequestBody CampusResource resource) {
        return campusResourceService.saveResource(resource);
    }

    @PutMapping("/{id}")
    public CampusResource update(
            @PathVariable Long id,
            @RequestBody CampusResource resource
    ) {
        return campusResourceService.updateResource(id, resource);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        campusResourceService.deleteResource(id);
    }

    @GetMapping("/available")
    public List<CampusResource> getAvailable() {
        return campusResourceService.getAvailableResources();
    }

    @GetMapping("/status/{status}")
    public List<CampusResource> getByStatus(@PathVariable String status) {
        return campusResourceService.getResourcesByStatus(status);
    }
}
