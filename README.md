# Multiverse Archive — Angular UI Library

## 1. Descripción del proyecto

Multiverse Archive es un proyecto desarrollado con Angular y TypeScript que contiene una biblioteca de componentes de interfaz reutilizables y una aplicación demo para demostrar su funcionamiento.

La biblioteca `ui-lib` proporciona cuatro componentes independientes: `ui-button`, `ui-card`, `ui-select` y `ui-table`.

La aplicación `demo-app` integra estos componentes con la API pública de Rick and Morty, permitiendo explorar personajes, episodios y localizaciones.

El objetivo principal es desarrollar componentes configurables, reutilizables y desacoplados de la aplicación que los consume.

## 2. Tecnologías utilizadas

- Angular 22
- TypeScript
- Tailwind CSS v3
- Angular Signals
- RxJS
- Rick and Morty API

## 3. Arquitectura del proyecto

El workspace está organizado en dos proyectos independientes:

```text
my-workspace/
├── projects/
│   ├── ui-lib/
│   │   └── src/
│   │       ├── lib/
│   │       │   ├── ui-button.ts
│   │       │   ├── ui-card/
│   │       │   ├── ui-select/
│   │       │   └── ui-table/
│   │       └── public-api.ts
│   │
│   └── demo-app/
│       └── src/
│           ├── app/
│           │   ├── models/
│           │   ├── services/
│           │   ├── app.ts
│           │   ├── app.html
│           │   └── app.css
│           ├── index.html
│           └── styles.css
│
├── tailwind.config.js
├── package.json
└── README.md
```

## 4. Instalación y ejecución

### Requisitos previos

- Node.js
- npm
- Angular CLI

### Clonar el repositorio

```bash
git clone https://github.com/lgpuentes/angular-ui-library.git
```

Ingresar al directorio:

```bash
cd angular-ui-library
```

Instalar las dependencias:

```bash
npm install
```

### Ejecutar la aplicación

```bash
ng serve demo-app
```

Abrir el navegador en:

```text
http://localhost:4200/
```

## 5. Documentación de componentes

Los componentes utilizan Angular Signals para gestionar sus entradas y salidas, y `ChangeDetectionStrategy.OnPush` para la estrategia de detección de cambios.

### 5.1 ui-button

Botón reutilizable con variantes visuales, tamaños y estado de carga.

**Inputs**

| Input | Tipo | Valor predeterminado | Descripción |
|---|---|---|---|
| `label` | `string` | `'Aceptar'` | Texto del botón. |
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Variante visual. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción. |
| `loading` | `boolean` | `false` | Muestra el indicador de carga. |

**Outputs**

| Output | Tipo | Descripción |
|---|---|---|
| `clicked` | `void` | Emite un evento al hacer clic. |

**Ejemplo de uso**

```html
<ui-button
  label="Guardar"
  variant="primary"
  size="md"
  [disabled]="false"
  [loading]="false"
  (clicked)="guardar()"
/>
```

### 5.2 ui-card

Tarjeta reutilizable con encabezado configurable, niveles de elevación y contenido proyectado mediante `ng-content`.

**Inputs**

| Input | Tipo | Valor predeterminado |
|---|---|---|
| `title` | `string` | `''` |
| `subtitle` | `string \| null` | `null` |
| `elevation` | `'flat' \| 'raised' \| 'outlined'` | `'flat'`|

**Output**

| Output | Tipo | Descripción |
|---|---|---|
| `headerClicked` | `void` | Emite un evento al interactuar con el encabezado. |

**Ejemplo de uso**

```html
<ui-card
  title="Información del personaje"
  subtitle="Detalles del registro"
  elevation="raised"
  (headerClicked)="verDetalles()"
>
  <p>Contenido de la tarjeta.</p>
</ui-card>
```

### 5.3 ui-select

Selector reutilizable que permite presentar opciones, gestionar estados de carga y deshabilitación, y mantener un valor seleccionado.

**Inputs**

| Input | Tipo | Descripción |
|---|---|---|
| `options` | `SelectOption[]` | Opciones disponibles. |
| `label` | `string` | Etiqueta del selector. |
| `placeholder` | `string` | Texto cuando no hay selección. |
| `loading` | `boolean` | Indica que las opciones están cargando. |
| `disabled` | `boolean` | Deshabilita el selector. |

**Modelo**

| Modelo | Tipo | Descripción |
|---|---|---|
| `value` | `string \| null` | Valor seleccionado, gestionado mediante `model()`. |

**Output**

| Output | Tipo | Descripción |
|---|---|---|
| `selectionChanged` | `SelectOption` | Emite la opción seleccionada. |

**Ejemplo de uso**

```html
<ui-select
  label="Seleccionar recurso"
  placeholder="Elige una opción"
  [options]="options"
  [(value)]="selectedValue"
  (selectionChange)="onSelectionChange($event)"
/>
```

### 5.4 ui-table

Tabla genérica que permite representar diferentes estructuras de datos mediante columnas configurables. Incluye estados de carga, mensajes de error y acciones por registro.

**Inputs**

| Input | Tipo | Descripción |
|---|---|---|
| `rows` | `T[]` | Registros que se mostrarán. |
| `columns` | `TableColumn<T>` | Define las columnas de la tabla. |
| `loading` | `boolean` | Indica el estado de carga. |
| `emptyMessage` | `string` | Mensaje cuando no hay registros. |
| `errorMessage` | `string \| null` | Mensaje de error. |

**Output**

| Output | Tipo | Descripción |
|---|---|---|
| `actionTriggered` | `{ action: 'view' \| 'delete'; row: T }` | Emite la acción realizada y el registro correspondiente. |

**Ejemplo de uso**

```html
<ui-table
  [rows]="characters"
  [columns]="columns"
  [loading]="loading"
  emptyMessage="No se encontraron registros"
  [errorMessage]="errorMessage"
  (actionTriggered)="handleAction($event)"
/>
```

El componente utiliza un tipo genérico `T`, por lo que puede trabajar con diferentes modelos de datos sin depender de una estructura específica.

## 6. Modelos de datos

### Modelos de la aplicación

La demo utiliza modelos TypeScript para representar los recursos de Rick and Morty API:

| Modelo | Responsabilidad |
|---|---|
| `ApiResponse<T>` | Representa la estructura genérica de las respuestas paginadas de la API. |
| `Character` | Representa los personajes. |
| `Episode` | Representa los episodios. |
| `Location` | Representa las localizaciones. |
| `ResourceTableItem` | Normaliza los datos para su presentación en la tabla. |
| `SelectOption` | Representa las opciones utilizadas por el selector. |

La tabla utiliza tipado genérico para permitir la reutilización con diferentes estructuras de datos.

## 7. Decisiones de diseño y arquitectura

- **Separación de responsabilidades:** la biblioteca de componentes y la aplicación demo se mantienen como proyectos independientes.
- **Reutilización:** los componentes no dependen de los modelos ni de la temática de Rick and Morty.
- **Standalone components:** los componentes se desarrollan de forma independiente, sin necesidad de módulos tradicionales.
- **Angular Signals:** se utilizan `input()`, `output()` y `model()` para gestionar la comunicación y el estado de los componentes.
- **OnPush:** se adopta esta estrategia de detección de cambios en los componentes de la biblioteca.
- **Tipado estricto:** se utilizan interfaces y genéricos para mantener la seguridad de tipos, evitando el uso de `any`.
- **Tailwind CSS v3:** se utiliza para implementar los estilos de los cuatro componentes y mantener una presentación consistente.
- **Servicio centralizado:** las solicitudes HTTP a Rick and Morty API se gestionan desde un servicio, evitando colocar esta responsabilidad en los componentes visuales.
- **Normalización de datos:** los diferentes recursos se adaptan a una estructura común para poder mostrarlos en la misma tabla.
- **Diseño adaptable:** la demo incorpora una interfaz responsive para dispositivos móviles y escritorio.

## 8. API externa

El proyecto utiliza Rick and Morty API para consultar los siguientes recursos:

| Recurso | Endpoint |
|---|---|
| Personajes | `https://rickandmortyapi.com/api/character` |
| Episodios | `https://rickandmortyapi.com/api/episode` |
| Localizaciones | `https://rickandmortyapi.com/api/location` |

Documentación oficial: https://rickandmortyapi.com/documentation

## 10. Autor y repositorio

**Repositorio GitHub:**  
https://github.com/lgpuentes/angular-ui-library
