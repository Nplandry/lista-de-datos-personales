import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/region';

@Component({
  selector: 'app-persona-form',
  imports: [ReactiveFormsModule],
  templateUrl: './persona-form.html',
  styleUrl: './persona-form.css',
})
export class PersonaForm implements OnInit {
  private readonly personaService = inject(PersonaService);
  private readonly regionService = inject(RegionService);
  private readonly fb = inject(FormBuilder);

  readonly regiones = signal<Region[]>([]);
  readonly regionSeleccionada = signal('');
  readonly error = signal('');

  readonly form = this.fb.group({
    nombre: this.fb.nonNullable.control('', Validators.required),
    apellido: this.fb.nonNullable.control('', Validators.required),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    edad: this.fb.control<number | null>(null, [Validators.required, Validators.min(18)]),
    region: this.fb.nonNullable.control('', Validators.required),
    comuna: this.fb.nonNullable.control({ value: '', disabled: true }, Validators.required),
  });

  ngOnInit(): void {
    this.regionService.listar().subscribe({
      next: (regiones) => this.regiones.set(regiones),
      error: () => this.error.set('No se pudieron cargar las regiones.'),
    });

    this.form.controls.region.valueChanges.subscribe((region) => {
      this.regionSeleccionada.set(region);
      this.form.controls.comuna.setValue('');
      if (region) {
        this.form.controls.comuna.enable();
      } else {
        this.form.controls.comuna.disable();
      }
    });
  }

  readonly comunas = computed(() => {
    const region = this.regionSeleccionada();
    return this.regiones().find((reg) => reg.nombre === region)?.comunas ?? [];
  });

  crear(): void {
    if (this.form.invalid) {
      return;
    }

    this.error.set('');
    const valor = this.form.getRawValue();
    this.personaService
      .crear({
        nombre: valor.nombre.trim(),
        apellido: valor.apellido.trim(),
        email: valor.email.trim(),
        edad: Number(valor.edad),
        region: valor.region,
        comuna: valor.comuna,
      })
      .subscribe({
        next: () => this.form.reset(),
        error: () => this.error.set('No se pudo crear la persona. Revise los datos e intente nuevamente.'),
      });
  }
}
