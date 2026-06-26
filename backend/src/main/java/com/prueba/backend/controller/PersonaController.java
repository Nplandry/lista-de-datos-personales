package com.prueba.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.backend.dto.PersonaRequest;
import com.prueba.backend.dto.PersonaResponse;
import com.prueba.backend.service.PersonaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonaController {
    private final PersonaService personaService;

    // inyeccion de dependencias del controlador rest
    public PersonaController(PersonaService personaService) {
        this.personaService = personaService;
    }
    //Health check endpoint
    @GetMapping("/health")
    public String healthCheck() {
        return "OK";
    }

    @PostMapping("/personas")
    @ResponseStatus(HttpStatus.CREATED)
    public PersonaResponse crear(@Valid @RequestBody PersonaRequest request) {
        return personaService.crear(request);
    }

    @GetMapping("/personas")
    public List<PersonaResponse> listar() {
        return personaService.listar();
    }

    @GetMapping("/personas/{id}")
    public PersonaResponse obtenerPorId(@PathVariable Long id) {
        return personaService.obtenerPorId(id);
    }

    @DeleteMapping("/personas/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        personaService.eliminar(id);
    }
}
