package com.anota.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class DocumentResponse {

    private UUID id;
    private String slug;
    private String content;
    private boolean hasReadPassword;
    private boolean hasWritePassword;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isHasReadPassword() {
        return hasReadPassword;
    }

    public void setHasReadPassword(boolean hasReadPassword) {
        this.hasReadPassword = hasReadPassword;
    }

    public boolean isHasWritePassword() {
        return hasWritePassword;
    }

    public void setHasWritePassword(boolean hasWritePassword) {
        this.hasWritePassword = hasWritePassword;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
