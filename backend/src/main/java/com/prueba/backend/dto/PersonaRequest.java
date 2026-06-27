package com.prueba.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// DTO de entrada
public record PersonaRequest(
    @NotBlank String nombre,
    @NotBlank String apellido,
    @NotBlank @Email String email,
    @NotNull @Min(18) Integer edad,
    @NotBlank String region,
    @NotBlank String comuna
) {
}
