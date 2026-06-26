package com.prueba.backend.model;

public record Persona(
    Long id,
    String nombre,
    String apellido,
    String email,
    int edad,
    String region,
    String comuna
) {
}
