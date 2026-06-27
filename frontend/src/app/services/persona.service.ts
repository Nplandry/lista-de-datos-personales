import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Persona, PersonaRequest } from '../models/persona';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PersonaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/personas`;

  private readonly _personas = signal<Persona[]>([]);
  readonly personas = this._personas.asReadonly();

  cargar(): Observable<Persona[]> {
    return this.http
      .get<Persona[]>(this.baseUrl)
      .pipe(tap((personas) => this._personas.set(personas)));
  }

  crear(persona: PersonaRequest): Observable<Persona> {
    return this.http
      .post<Persona>(this.baseUrl, persona)
      .pipe(tap((creada) => this._personas.update((lista) => [...lista, creada])));
  }

  eliminar(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => this._personas.update((lista) => lista.filter((persona) => persona.id !== id))));
  }
}
