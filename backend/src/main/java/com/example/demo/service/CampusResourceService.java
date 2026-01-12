package com.example.demo.service;

import com.example.demo.model.CampusResource;
import com.example.demo.repository.CampusResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CampusResourceService {

    private final CampusResourceRepository campusResourceRepository;

    public List<CampusResource> getAllResources() {
        return campusResourceRepository.findAll();
    }

    public CampusResource getResourceById(Long id) {
        return campusResourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found with id: " + id));
    }

    public CampusResource saveResource(CampusResource resource) {
        return campusResourceRepository.save(resource);
    }

    public CampusResource updateResource(Long id, CampusResource updatedResource) {
        CampusResource existing = getResourceById(id);

        existing.setName(updatedResource.getName());
        existing.setType(updatedResource.getType());
        existing.setRoom(updatedResource.getRoom());
        existing.setFloor(updatedResource.getFloor());
        existing.setLocation(updatedResource.getLocation());
        existing.setLatitude(updatedResource.getLatitude());
        existing.setLongitude(updatedResource.getLongitude());
        existing.setIsAvailable(updatedResource.getIsAvailable());
        existing.setStatus(updatedResource.getStatus());

        return campusResourceRepository.save(existing);
    }

    public void deleteResource(Long id) {
        campusResourceRepository.deleteById(id);
    }

    public List<CampusResource> getAvailableResources() {
        return campusResourceRepository.findByIsAvailable(true);
    }

    public List<CampusResource> getResourcesByStatus(String status) {
        return campusResourceRepository.findByStatus(status);
    }
}
