package com.anota.backend.service;

import com.anota.backend.dto.AuthRequest;
import com.anota.backend.dto.AuthResponse;
import com.anota.backend.dto.DocumentRequest;
import com.anota.backend.dto.DocumentResponse;
import com.anota.backend.repository.DocumentRepository;
import org.springframework.stereotype.Service;
import com.anota.backend.model.Document;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class DocumentService {

    private final DocumentRepository repository;
    private final AuthService authService;

    public DocumentService(DocumentRepository repository, AuthService authService) {
        this.repository = repository;
        this.authService = authService;
    }

    public Optional<Document> findBySlug(String slug) {
        return repository.findBySlug(slug);
    }

    public DocumentResponse create(DocumentRequest request) {
        Document document = new Document();

        document.setSlug(request.getSlug());
        document.setContent("");
        document.setCreatedAt(LocalDateTime.now());
        document.setUpdatedAt(LocalDateTime.now());

        if (request.getReadPassword() != null) {
            document.setReadPasswordHash(authService.hashPassword(request.getReadPassword()));
        }

        if (request.getWritePassword() != null) {
            document.setWritePasswordHash(authService.hashPassword(request.getWritePassword()));
        }

        Document saved =  repository.save(document);

        return toResponse(saved);
    }

    public DocumentResponse toResponse(Document document) {
        DocumentResponse response = new DocumentResponse();

        response.setId(document.getId());
        response.setSlug(document.getSlug());
        response.setContent(document.getContent());
        response.setCreatedAt(document.getCreatedAt());
        response.setUpdatedAt(document.getUpdatedAt());

        response.setHasReadPassword(document.getReadPasswordHash() != null);
        response.setHasWritePassword(document.getWritePasswordHash() != null);

        return response;
    }

    public DocumentResponse updateContent(String slug, String content) {
        Document document = repository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        document.setContent(content);
        document.setUpdatedAt(LocalDateTime.now());

        Document saved = repository.save(document);
        return toResponse(saved);
    }

    public AuthResponse authenticate(String slug, AuthRequest request) {
        Document document = repository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        if (request.getType().equals("read")) {
            boolean ok = authService.verifyPassword(request.getPassword(), document.getReadPasswordHash());
            if (!ok) throw new RuntimeException("Senha incorreta");
            String token = authService.generateToken(slug, "read");
            return new AuthResponse(token, "read");
        } else {
            boolean ok = authService.verifyPassword(request.getPassword(), document.getWritePasswordHash());
            if (!ok) throw new RuntimeException("Senha incorreta");
            String token = authService.generateToken(slug, "read_write");
            return new AuthResponse(token, "read_write");
        }
    }
}
