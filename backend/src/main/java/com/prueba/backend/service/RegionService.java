package com.prueba.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.prueba.backend.model.Region;

@Service
public class RegionService {

    private static final List<Region> REGIONES = List.of(
        new Region("Región Metropolitana", List.of("Santiago", "Providencia", "Macul")),
        new Region("Valparaíso", List.of("Valparaíso", "Viña del Mar")),
        new Region("Ohiggins", List.of("Rancagua", "Graneros", "Pichilemu"))
    );

    public List<Region> listar() {
        return REGIONES;
    }

    public boolean comunaPerteneceARegion(String region, String comuna) {
        return REGIONES.stream()
            .filter(reg -> reg.nombre().equals(region))
            .anyMatch(reg -> reg.comunas().contains(comuna));
    }
}
