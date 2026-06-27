package com.prueba.backend.dto;

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
