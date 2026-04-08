package com.anota.backend.controller;

import com.anota.backend.dto.AuthRequest;
import com.anota.backend.dto.AuthResponse;
import com.anota.backend.dto.DocumentRequest;
import com.anota.backend.dto.DocumentResponse;
import com.anota.backend.model.Document;
import com.anota.backend.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/doc")
public class DocumentController {

    private final DocumentService service;

    public DocumentController(DocumentService service) {
        this.service = service;
    }

    @GetMapping("/{slug}")
    public ResponseEntity<DocumentResponse> getBySlug(@PathVariable String slug) {
        Optional<Document> document = service.findBySlug(slug);
        return document.map(d -> ResponseEntity.ok(service.toResponse(d))).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DocumentResponse> createDocument(@RequestBody DocumentRequest request) {
        DocumentResponse documentResponse = service.create(request);
        return ResponseEntity.status(201).body(documentResponse);
    }

    @PatchMapping("/{slug}")
    public ResponseEntity<DocumentResponse> updateContent(
            @PathVariable String slug,
            @RequestBody DocumentRequest request) {
        DocumentResponse response = service.updateContent(slug, request.getContent());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{slug}/auth")
    public ResponseEntity<AuthResponse> authenticate (@PathVariable String slug, @RequestBody AuthRequest request) {
        AuthResponse response = service.authenticate(slug, request);
        return ResponseEntity.ok(response);
    }
}
