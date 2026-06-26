# Lista de datos personales

Aplicacion simple para administrar personas mediante consultas REST desde un cliente SPA.

- **Backend:** API REST con Spring Boot (maven y java 17)
- **Frontend:** Angular (version 21) que consume la API.

## Requisitos

- JDK 17 y Maven 3.5+ 
- Node.js 20+ y npm 10+.

Levanta primero el backend y luego el frontend. El frontend espera la API en
`http://localhost:8080` y se sirve en `http://localhost:4200`.

---

## Backend Java

Desde la carpeta `backend/`:

```bash
cd backend
./mvnw spring-boot:run
```

Queda disponible en `http://localhost:8080`.

Ejecutar los tests:

```bash
./mvnw test
```

### Endpoints


| Método | Ruta             | Descripción                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | `/health`        | Verifica que el servicio esté arriba |
| GET    | `/regiones`      | Lista las regiones con sus comunas   |
| POST   | `/personas`      | Crea una persona                     |
| GET    | `/personas`      | Lista todas las personas             |
| GET    | `/personas/{id}` | Obtiene una persona por su id        |
| DELETE | `/personas/{id}` | Elimina una persona por su id        |


### Ejemplos con curl

```bash
# Health check
curl http://localhost:8080/health

# Listar regiones y comunas
curl http://localhost:8080/regiones

# Crear una persona
curl -X POST http://localhost:8080/personas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "edad": 30,
    "region": "Región Metropolitana",
    "comuna": "Santiago"
  }'

# Listar todas las personas
curl http://localhost:8080/personas

# Obtener una persona por id
curl http://localhost:8080/personas/1

# Eliminar una persona por id
curl -X DELETE http://localhost:8080/personas/1
```

Los errores 400, 404 y 500 se devuelven con el formato por defecto de Spring,
ya que esta versión no contempla un control de excepciones global en el controlador.

---

## Frontend Angular

Desde la carpeta `frontend/`:

```bash
cd frontend
npm install
npm start
```

Queda disponible en `http://localhost:4200`.


Ejecutar los tests:

```bash
npm test
```
Otros:
Compilacion para produccion
```bash
npm run build
```

### Funcionalidades

- Listar personas obtenidas desde el backend.
- Crear una persona mediante un formulario con validaciones.
- Eliminar una persona.
- Selección de Región y Comuna mediante listas desplegables dependientes (drop down anidados).

### Validaciones del formulario

- Nombre, apellido, email, edad, región y comuna son obligatorios.
- Email debe tener formato válido.
- Edad debe ser mayor o igual a 18.
- La comuna debe corresponder a la región seleccionada.

