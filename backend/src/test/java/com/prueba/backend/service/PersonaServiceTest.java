package com.prueba.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test; //junit test

import com.prueba.backend.dto.PersonaRequest;
import com.prueba.backend.dto.PersonaResponse;

class PersonaServiceTest {

    @Test
    void crearPersonaDevuelveLaPersonaConId() {
        PersonaService service = new PersonaService(new RegionService());

        PersonaRequest request = new PersonaRequest(
            "Juan", "Perez", "juan@gmail.com", 23, "Región Metropolitana", "Santiago"
        );

        PersonaResponse response = service.crear(request);

        assertEquals(1L, response.id());
        assertEquals("Juan", response.nombre());
    }
}
