# DECISIONES.md — MiniLiga Express

## Objetivo
Documentar las decisiones técnicas clave tomadas en el desarrollo del proyecto **MiniLiga Express**, que incluye:
- Backend en **Laravel (PHP 8)**
- Web en **Angular**
- Mobile en **Ionic Angular**

---

## Backend (Laravel)

### Decisiones
- Se utilizó **Laravel** con **PHP 8** para aprovechar la sintaxis moderna, la validación sencilla y la integración con Eloquent ORM.  
- Se agregó un nuevo servicio:
  ```php
  Route::get('/matches', [MatchController::class, 'index']);
  ```
  Este endpoint expone la lista de partidos (`matches`) para ser consumido desde la app móvil.

- El backend expone los siguientes endpoints principales:
  - `GET /api/teams`
  - `POST /api/teams` `{ name }`
  - `GET /api/matches`
  - `POST /api/matches/{id}/result` `{ home_score, away_score }`
  - `GET /api/standings`

### Trade-offs
- Laravel ofrece gran productividad, pero el rendimiento puede ser menor frente a frameworks más livianos como Lumen.
- Mantener PHP 8 exige asegurar compatibilidad de dependencias, pero garantiza acceso a tipado fuerte y mejoras de rendimiento.

### Próximos pasos
- Implementar **autenticación (login y tokens)** para proteger los endpoints.
- Añadir **tests automáticos** y **documentación OpenAPI (openapi.yaml)**.

---

## Web (Angular)

### Decisiones
- Se eligió **Angular** por su estructura modular, tipado fuerte y escalabilidad.  
- Se instaló **TailwindCSS** para disponer de utilidades CSS modernas y lograr **diseños responsive** sin sobrecargar el proyecto con dependencias adicionales.  
- Se incorporó **SweetAlert2** para manejar **mensajes de carga, éxito y error**, mejorando la experiencia del usuario.

### Trade-offs
- Angular tiene una curva de aprendizaje más pronunciada que frameworks como Vue o React, pero facilita mantener proyectos grandes y organizados.
- Tailwind reduce la necesidad de escribir CSS manual, aunque puede dificultar la lectura del HTML por la gran cantidad de clases.

### Próximos pasos
- Integrar **Angular Material** para mejorar las tablas, filtros y paginación.
- Implementar **login y manejo de sesiones**.
- Agregar **guards** para restringir acceso según autenticación.

---

## Mobile (Ionic Angular)

### Decisiones
- Se utilizó **Ionic Angular** aprovechando su integración directa con Angular y sus componentes UI preconstruidos.  
- No se usó Tailwind, ya que los estilos de Ionic son suficientes para una **interfaz sencilla y limpia**.  
- Se agregó **SweetAlert2** también en el móvil para mensajes uniformes con la versión web.
- Se añadió una pestaña llamada **“Partidos”**, que consume el endpoint `/matches`, permitiendo **listar y reportar resultados** de los encuentros.

### Trade-offs
- Ionic es rápido para prototipos y apps híbridas, pero el rendimiento no iguala al de una app nativa.
- La UI depende en gran medida del WebView, lo que puede limitar la personalización avanzada.

### Próximos pasos
- Incorporar **autenticación y almacenamiento local** con Capacitor.
- Optimizar tiempos de carga y caching de datos.

---

## Conclusión

El proyecto mantiene una estructura clara:
```
backend/
web/
mobile/
```

Cada capa cumple un rol independiente, pero comparten estilos de comunicación.  
Los próximos pasos se enfocan en **autenticación**, **mejoras visuales** y **optimización de la experiencia de usuario**.
