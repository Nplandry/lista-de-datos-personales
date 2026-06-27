package com.prueba.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.prueba.backend.dto.PersonaRequest;
import com.prueba.backend.dto.PersonaResponse;
import com.prueba.backend.model.Persona;

@Service
public class PersonaService {
    private final Map<Long, Persona> personas = new HashMap<>();
    private long siguienteId = 1;

    private final RegionService regionService;

    public PersonaService(RegionService regionService) {
        this.regionService = regionService;
    }

    public PersonaResponse crear(PersonaRequest request) {
        if (!regionService.comunaPerteneceARegion(request.region(), request.comuna())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Comuna seleccionada no corresponde a ninguna region"
            );
        }

        Persona persona = new Persona(
            siguienteId++,
            request.nombre().trim(),
            request.apellido().trim(),
            request.email().trim(),
            request.edad(),
            request.region(),
            request.comuna()
        );

        personas.put(persona.id(), persona);
        return toResponse(persona);
    }

    public List<PersonaResponse> listar() {
        List<PersonaResponse> respuesta = new ArrayList<>();
        for (Persona persona : personas.values()) {
            respuesta.add(toResponse(persona));
        }
        return respuesta;
    }

    public PersonaResponse obtenerPorId(Long id) {
        return buscarPorId(id)
            .map(this::toResponse)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Persona no encontrada"));
    }

    public void eliminar(Long id) {
        if (!personas.containsKey(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Persona no encontrada");
        }
        personas.remove(id);
    }

    private Optional<Persona> buscarPorId(Long id) {
        return Optional.ofNullable(personas.get(id));
    }

    private PersonaResponse toResponse(Persona persona) {
        return new PersonaResponse(
            persona.id(),
            persona.nombre(),
            persona.apellido(),
            persona.email(),
            persona.edad(),
            persona.region(),
            persona.comuna()
        );
    }
}
