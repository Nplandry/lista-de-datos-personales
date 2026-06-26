export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  edad: number;
  region: string;
  comuna: string;
}

export interface PersonaRequest {
  nombre: string;
  apellido: string;
  email: string;
  edad: number;
  region: string;
  comuna: string;
}
