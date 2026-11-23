# Development Log

**Proyecto:** Angular UI Library – Instaleap Technical Challenge  
**Tecnologías:** Angular, TypeScript, Tailwind CSS v3 y Rick and Morty API.

## 1. Decisiones técnicas y de arquitectura

- **Separación entre biblioteca y aplicación demo:** se desarrolló `ui-lib` como una biblioteca independiente de componentes reutilizables y `demo-app` como aplicación de demostración. Esto permite mantener los componentes desacoplados de la temática y la lógica específica de la aplicación.
- **Componentes standalone:** se utilizó la arquitectura standalone de Angular para simplificar las dependencias y la integración de los componentes.
- **ChangeDetectionStrategy.OnPush:** se configuró en los cuatro componentes para aprovechar un mecanismo de detección de cambios más eficiente.
- **Angular Signals:** se utilizaron `input()`, `output()` y `model()` para gestionar la comunicación entre componentes.
- **Tipado estricto:** se utilizaron interfaces, tipos y genéricos para mantener la seguridad de tipos. Se evitó el uso de `any`.
- **Tabla genérica:** se implementó `ui-table` mediante un tipo genérico `T`, permitiendo mostrar diferentes estructuras de datos sin limitar el componente a un recurso específico.
- **Normalización de datos:** en la aplicación demo se utilizó una estructura común para representar personajes, episodios y localizaciones, facilitando su visualización en la misma tabla.
- **Gestión de peticiones:** se centralizó la comunicación con Rick and Morty API en un servicio, utilizando `HttpClient` y observables de RxJS.
- **Estilos:** se migraron los estilos de los cuatro componentes de la biblioteca a Tailwind CSS v3. La aplicación demo utiliza una temática visual inspirada en Rick and Morty, sin acoplar esa identidad visual a la biblioteca.
- **Documentación:** se agregó documentación JSDoc a las clases, inputs, outputs, models y elementos públicos relevantes de los componentes.

## 2. Retos encontrados y soluciones

### Configuración de Tailwind CSS v3

Fue necesario ajustar la configuración de Tailwind para trabajar con la estructura del workspace Angular y asegurar que los archivos HTML y TypeScript de los proyectos fueran incluidos en el escaneo de clases.

**Solución:** se configuró `tailwind.config.js`, los archivos de PostCSS y las directivas de Tailwind en los estilos globales de la aplicación demo.

### Integración de diferentes recursos de la API

Personajes, episodios y localizaciones presentan estructuras de datos diferentes, lo que dificultaba mostrarlos mediante una única tabla.

**Solución:** se creó una estructura normalizada en la aplicación demo y se utilizaron transformaciones para adaptar los recursos a las columnas de `ui-table`, conservando la naturaleza genérica del componente.

### Estados de la aplicación

Fue necesario contemplar los estados de carga, error y ausencia de registros, además de reiniciar el filtro de estado al cambiar de recurso.

**Solución:** se centralizó la gestión de los datos y se utilizaron Signals y propiedades computadas para mantener sincronizada la interfaz.

### Spinner del botón

Inicialmente, el spinner de `ui-button` utilizaba CSS convencional mediante una animación `@keyframes`.

**Solución:** se migró a clases de Tailwind CSS v3, utilizando `animate-spin` y conservando su apariencia y comportamiento.

### Diseño adaptable

Fue necesario ajustar la distribución de los elementos para que la aplicación pudiera visualizarse tanto en dispositivos móviles como en pantallas de escritorio.

**Solución:** se utilizaron clases responsive de Tailwind y se revisaron los principales elementos de la interfaz.

## 3. Uso de herramientas de inteligencia artificial

Se utilizó ChatGPT como herramienta de apoyo durante el desarrollo, principalmente para resolver dudas técnicas, comprender conceptos de Angular, analizar errores, revisar implementaciones y mejorar la documentación.

La IA se utilizó como apoyo y no como sustituto de la implementación y validación del código.

### Formulación de solicitudes

Las solicitudes se formularon proporcionando el contexto del proyecto, el código existente, el comportamiento esperado y las restricciones técnicas del reto.

Algunos ejemplos representativos de las solicitudes realizadas fueron:

- «Analiza este componente Angular y explícame cómo funciona su implementación».
- «Ayúdame a resolver este error de TypeScript sin utilizar `any`».
- «¿Cómo podemos hacer que esta tabla sea reutilizable para diferentes estructuras de datos?».
- «Revisa esta implementación y verifica que cumpla con los requisitos de Angular Signals».
- «Ayúdame a migrar estos estilos a Tailwind CSS v3 sin modificar la lógica del componente».

### Propuestas aceptadas e incorporadas

- **Uso de genéricos:** se adoptó el enfoque genérico para `ui-table`, ya que permite reutilizar el componente con diferentes tipos de registros.
- **Normalización de datos:** se incorporó la propuesta de adaptar los recursos de la API a una estructura común en la aplicación demo, sin restringir la biblioteca.
- **Tailwind CSS:** se aceptaron las recomendaciones para utilizar clases utilitarias y mantener una configuración compatible con la versión 3.

Estas propuestas se incorporaron después de revisar su correspondencia con los requisitos y con la implementación existente.

### Propuestas rechazadas o modificadas

- **Acoplar la biblioteca a Rick and Morty:** se descartó modificar los componentes de `ui-lib` para incorporar directamente la temática visual de la serie. Se decidió mantener esa identidad en `demo-app`, preservando la reutilización de la biblioteca.
- **Restringir la tabla a una estructura específica:** se descartó una implementación limitada a los campos de personajes de Rick and Morty. Se mantuvo el uso de genéricos para permitir diferentes tipos de datos.

## 4. Pruebas y validaciones

Durante el desarrollo se realizaron compilaciones de la biblioteca y de la aplicación demo para detectar errores de TypeScript, configuración e integración.

También se ejecutaron las pruebas disponibles del proyecto.

Entre las validaciones realizadas se encuentran:

- Compilación de `ui-lib` mediante `ng build ui-lib`.
- Compilación de `demo-app`.
- Ejecución de pruebas de `demo-app`.
- Verificación de la integración con Rick and Morty API.
- Comprobación de los filtros, estados de carga y errores.
- Verificación de la apertura y cierre del modal de detalles.
- Comprobación de las acciones emitidas por la tabla.
- Revisión visual de la aplicación en dispositivos móviles y escritorio.

Las pruebas disponibles de `demo-app` finalizaron sin errores después de los últimos cambios.

## 5. Consideraciones finales

El desarrollo permitió trabajar con la arquitectura de componentes standalone de Angular, Signals, genéricos de TypeScript, consumo de APIs REST, Tailwind CSS v3 y organización de proyectos mediante una biblioteca reutilizable.

El uso de inteligencia artificial facilitó la resolución de dudas y la evaluación de alternativas técnicas. Sin embargo, las decisiones finales se tomaron teniendo en cuenta los requisitos del reto, la estructura del proyecto y la validación de las implementaciones.