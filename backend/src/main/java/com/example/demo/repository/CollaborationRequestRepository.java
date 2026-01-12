package com.example.demo.repository;

import com.example.demo.model.AppUser;
import com.example.demo.model.CollaborationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CollaborationRequestRepository
        extends JpaRepository<CollaborationRequest, Long> {

    // ✅ ONLY pending requests for incoming list
    List<CollaborationRequest> findByReceiverAndStatus(
            AppUser receiver,
            CollaborationRequest.Status status
    );

    // Prevent duplicate requests
    Optional<CollaborationRequest> findBySenderAndReceiver(
            AppUser sender,
            AppUser receiver
    );
}
