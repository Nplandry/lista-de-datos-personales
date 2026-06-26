import { Component, input, output } from '@angular/core';
import { Persona } from '../../models/persona';

@Component({
  selector: 'app-persona-lista',
  imports: [],
  templateUrl: './persona-lista.html',
  styleUrl: './persona-lista.css',
})
export class PersonaLista {
  readonly personas = input<Persona[]>([]);
  readonly eliminar = output<number>();

  onEliminar(id: number): void {
    this.eliminar.emit(id);
  }
}
