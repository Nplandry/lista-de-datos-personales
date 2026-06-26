import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PersonaForm } from './persona-form';

describe('PersonaForm', () => {
  let component: PersonaForm;
  let fixture: ComponentFixture<PersonaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaForm],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
