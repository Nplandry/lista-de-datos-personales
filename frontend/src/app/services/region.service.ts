import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Region } from '../models/region';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/regiones`;

  listar(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl);
  }
}
