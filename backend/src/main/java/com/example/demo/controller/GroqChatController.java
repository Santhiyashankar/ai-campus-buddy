package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("req/api/chat")
public class GroqChatController {

    private final WebClient webClient;
    private final String model;

    public GroqChatController(
            @Value("${groq.api.key}") String apiKey,
            @Value("${groq.model}") String model
    ) {
        this.model = model;

        this.webClient = WebClient.builder()
                .baseUrl("https://api.groq.com/openai/v1/chat/completions")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @PostMapping
    public Mono<String> chat(@RequestBody Map<String, String> request) {

        String userMessage = request.get("message");

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", userMessage
                        )
                ),
                "max_tokens", 512
        );

        return webClient.post()
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    try {
                        List<Map<String, Object>> choices =
                                (List<Map<String, Object>>) response.get("choices");

                        Map<String, Object> message =
                                (Map<String, Object>) choices.get(0).get("message");

                        return message.get("content").toString();
                    } catch (Exception e) {
                        return "No response from Groq AI";
                    }
                });
    }
}
