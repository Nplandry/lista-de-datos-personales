package com.prueba.backend.dto;

// DTO de salida
public record PersonaResponse(
    Long id,
    String nombre,
    String apellido,
    String email,
    int edad,
    String region,
    String comuna
) {
}
