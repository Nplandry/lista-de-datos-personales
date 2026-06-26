package com.prueba.backend.model;

import java.util.List;

public record Region(
    String nombre,
    List<String> comunas
) {
}
