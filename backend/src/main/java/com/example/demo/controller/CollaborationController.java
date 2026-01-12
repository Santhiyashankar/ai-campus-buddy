package com.example.demo.controller;

import com.example.demo.model.AppUser;
import com.example.demo.model.CollaborationRequest;
import com.example.demo.repository.AppUserRepository;
import com.example.demo.repository.CollaborationRequestRepository;
import com.example.demo.service.CollaborationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/req/collaboration")
@RequiredArgsConstructor
public class CollaborationController {

    private final AppUserRepository userRepository;
    private final CollaborationRequestRepository collaborationRepository;
    private final CollaborationService collaborationService;

    @PostMapping("/send")
    public ResponseEntity<String> sendRequest(
            @RequestParam String senderEmail,
            @RequestParam String receiverEmail
    ) {

        AppUser sender = userRepository.findByEmailIgnoreCase(senderEmail)
                .orElseThrow();
        AppUser receiver = userRepository.findByEmailIgnoreCase(receiverEmail)
                .orElseThrow();

        CollaborationRequest req = new CollaborationRequest();
        req.setSender(sender);
        req.setReceiver(receiver);
        req.setStatus(CollaborationRequest.Status.PENDING);

        collaborationRepository.save(req);

        collaborationService.notifyUser(
                receiverEmail,
                "📩 Collaboration request from " + sender.getName()
        );

        return ResponseEntity.ok("Collaboration request sent successfully");
    }

    // Get incoming requests
    @GetMapping("/incoming")
    public List<CollaborationRequest> getIncoming(@RequestParam String email) {
        AppUser user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return collaborationRepository.findByReceiverAndStatus(
                user,
                CollaborationRequest.Status.PENDING
        );
    }


    // Respond to a request
    @PutMapping("/respond/{id}")
    public CollaborationRequest respond(@PathVariable Long id, @RequestParam boolean accept) {
        return collaborationService.respondToRequest(id, accept);
    }
    @GetMapping("/users")
    public List<AppUser> getAllUsers(@RequestParam String email) {
        return userRepository.findAll().stream()
                .filter(u -> !u.getEmail().equalsIgnoreCase(email))
                .collect(Collectors.toList());
    }

}
