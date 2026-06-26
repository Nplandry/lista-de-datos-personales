package com.prueba.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.backend.model.Region;
import com.prueba.backend.service.RegionService;

@RestController
@RequestMapping("/regiones")
@CrossOrigin(origins = "http://localhost:4200")
public class RegionController {
    private final RegionService regionService;

    // inyeccion de dependencias
    public RegionController(RegionService regionService) {
        this.regionService = regionService;
    }

    @GetMapping
    public List<Region> listar() {
        return regionService.listar();
    }
}
