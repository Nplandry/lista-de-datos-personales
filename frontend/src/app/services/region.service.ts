import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Region } from '../models/region';

@Injectable({ providedIn: 'root' })
export class RegionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080';

  listar(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.apiUrl}/regiones`);
  }
}
