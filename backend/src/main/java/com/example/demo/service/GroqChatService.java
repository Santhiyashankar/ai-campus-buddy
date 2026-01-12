package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class GroqChatService {

    private final WebClient webClient;
    private final String model;

    public GroqChatService(@Value("${groq.api.key}") String apiKey,
                           @Value("${groq.model}") String model) {
        this.model = model;
        this.webClient = WebClient.builder()
                .baseUrl("https://api.groq.com/openai/v1")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();
    }

    public Mono<String> generateReply(String userMessage) {

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "user", "content", userMessage)
                )
        );

        return webClient.post()
                .uri("/chat/completions")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    var choices = (List<Map<String, Object>>) response.get("choices");
                    if (choices != null && !choices.isEmpty()) {
                        var msg = (Map<String, Object>) choices.get(0).get("message");
                        if (msg != null && msg.get("content") != null) {
                            return msg.get("content").toString();
                        }
                    }
                    return "No response from AI";
                })
                .onErrorResume(err -> Mono.just("Error from Groq API: " + err.getMessage()));
    }
}
