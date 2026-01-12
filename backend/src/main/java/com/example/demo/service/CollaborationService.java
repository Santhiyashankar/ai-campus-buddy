package com.example.demo.service;

import com.example.demo.model.AppUser;
import com.example.demo.model.CollaborationRequest;
import com.example.demo.repository.CollaborationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollaborationService {

    private final CollaborationRequestRepository repository;
    private final SimpMessagingTemplate messagingTemplate;

    public CollaborationRequest sendRequest(AppUser sender, AppUser receiver) {
        CollaborationRequest collab = new CollaborationRequest();
        collab.setSender(sender);
        collab.setReceiver(receiver);
        collab.setStatus(CollaborationRequest.Status.PENDING);
        return repository.save(collab);
    }

    public List<CollaborationRequest> getIncomingRequests(AppUser receiver) {
        return repository.findByReceiverAndStatus(
                receiver,
                CollaborationRequest.Status.PENDING
        );
    }


    public CollaborationRequest respondToRequest(Long id, boolean accept) {
        CollaborationRequest collab = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collaboration not found"));

        collab.setStatus(accept ? CollaborationRequest.Status.ACCEPTED : CollaborationRequest.Status.REJECTED);
        return repository.save(collab);
    }
    public void notifyUser(String receiverEmail, String message) {
        messagingTemplate.convertAndSend(
                "/topic/notifications/" + receiverEmail,
                message
        );
    }

}
