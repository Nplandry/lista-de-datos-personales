import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  readonly regiones = signal<Region[]>([]);

  readonly form = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    apellido: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    edad: new FormControl<number | null>(null, [Validators.required, Validators.min(18)]),
    region: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    comuna: new FormControl({ value: '', disabled: true }, { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit(): void {
    this.regionService.listar().subscribe((regiones) => this.regiones.set(regiones));

    this.form.controls.region.valueChanges.subscribe((region) => {
      this.form.controls.comuna.setValue('');
      if (region) {
        this.form.controls.comuna.enable();
      } else {
        this.form.controls.comuna.disable();
      }
    });
  }

  get comunas(): string[] {
    return this.regiones().find((region) => region.nombre === this.form.controls.region.value)?.comunas ?? [];
  }

  crear(): void {
    if (this.form.invalid) {
      return;
    }

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
      .subscribe(() => this.form.reset());
  }
}
