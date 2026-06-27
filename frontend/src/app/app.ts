import { Component, OnInit, inject, signal } from '@angular/core';
import { PersonaForm } from './components/persona-form/persona-form';
import { PersonaLista } from './components/persona-lista/persona-lista';
import { PersonaService } from './services/persona.service';

@Component({
  selector: 'app-root',
  imports: [PersonaForm, PersonaLista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly personaService = inject(PersonaService);
  readonly personas = this.personaService.personas;
  readonly error = signal('');

  ngOnInit(): void {
    this.personaService.cargar().subscribe({
      next: () => this.error.set(''),
      error: () => this.error.set('No se pudieron cargar las personas.'),
    });
  }

  eliminar(id: number): void {
    this.personaService.eliminar(id).subscribe({
      next: () => this.error.set(''),
      error: () => this.error.set('No se pudo eliminar la persona.'),
    });
  }
}
