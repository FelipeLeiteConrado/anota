package com.anota.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        if (ex.getMessage().equals("Senha incorreta")) {
            return ResponseEntity.status(401).body(Map.of("error", ex.getMessage()));
        }
        if (ex.getMessage().equals("Document not found")) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
        return ResponseEntity.status(500).body(Map.of("error", "Erro interno"));
    }
}