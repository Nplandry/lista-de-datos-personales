import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/region';

@Component({
  selector: 'app-persona-form',
  imports: [FormsModule],
  templateUrl: './persona-form.html',
  styleUrl: './persona-form.css',
})
export class PersonaForm implements OnInit {
  private readonly personaService = inject(PersonaService);
  private readonly regionService = inject(RegionService);

  readonly regiones = signal<Region[]>([]);

  nombre = '';
  apellido = '';
  email = '';
  edad: number | null = null;
  region = '';
  comuna = '';

  ngOnInit(): void {
    this.regionService.listar().subscribe((regiones) => this.regiones.set(regiones));
  }

  // se derivaran de la region a escoger -> dependientes
  get comunas(): string[] {
    return this.regiones().find((region) => region.nombre === this.region)?.comunas ?? [];
  }

  //al cambiar region la comuna previa dejara de ser valida...
  alCambiarRegion(): void {
    this.comuna = '';
  }

  crear(): void {
    this.personaService
      .crear({
        nombre: this.nombre.trim(),
        apellido: this.apellido.trim(),
        email: this.email.trim(),
        edad: Number(this.edad),
        region: this.region,
        comuna: this.comuna,
      })
      .subscribe(() => this.reiniciar());
  }

  private reiniciar(): void {
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.edad = null;
    this.region = '';
    this.comuna = '';
  }
}
