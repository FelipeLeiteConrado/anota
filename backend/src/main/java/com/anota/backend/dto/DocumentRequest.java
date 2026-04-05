package com.anota.backend.dto;

public class DocumentRequest {

    private String slug;
    private String readPassword;
    private String writePassword;
    private String content;

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getReadPassword() {
        return readPassword;
    }

    public void setReadPassword(String readPassword) {
        this.readPassword = readPassword;
    }

    public String getWritePassword() {
        return writePassword;
    }

    public void setWritePassword(String writePassword) {
        this.writePassword = writePassword;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
}
