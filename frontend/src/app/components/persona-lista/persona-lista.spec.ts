import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { PersonaLista } from './persona-lista';

describe('PersonaLista', () => {
  let component: PersonaLista;
  let fixture: ComponentFixture<PersonaLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaLista],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
