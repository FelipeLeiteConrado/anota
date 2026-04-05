package com.anota.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "slug", unique = true, nullable = false)
    private String slug;
    @Column(name = "content", nullable = false)
    private String content;
    @Column(name = "read_password_hash")
    private String readPasswordHash;
    @Column(name = "write_password_hash")
    private String writePasswordHash;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Document() {
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getWritePasswordHash() {
        return writePasswordHash;
    }

    public void setWritePasswordHash(String writePasswordHash) {
        this.writePasswordHash = writePasswordHash;
    }

    public String getReadPasswordHash() {
        return readPasswordHash;
    }

    public void setReadPasswordHash(String readPasswordHash) {
        this.readPasswordHash = readPasswordHash;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
