import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

// Configuracion standalone 
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // Zoneless que detecta cambios via signals 
    provideBrowserGlobalErrorListeners(), // Escucha errores globales del navegador
    provideRouter(routes), // Routing habilita la navegacion entre vistas
    provideHttpClient(withFetch()) // HttpClient usa el fetch del navegador
  ]
};
