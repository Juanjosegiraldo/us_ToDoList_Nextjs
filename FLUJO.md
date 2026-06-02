# Flujo del código — Todo List en Next.js

## Estructura de archivos

```
src/
└── app/
    ├── layout.tsx              # Raíz HTML de la aplicación
    ├── page.tsx                # Ruta principal "/"
    ├── globals.css             # Estilos globales + clases de las tarjetas
    └── components/
        ├── TaskApp.tsx         # Lógica del estado y lista de tareas
        └── Card.tsx            # Componente visual de una tarea individual
```

---

## Flujo general

```
layout.tsx
  └── page.tsx  (ruta "/")
        └── TaskApp.tsx  (estado global + lista)
              └── Card.tsx  (una tarjeta por tarea)
```

Cuando el usuario abre la app en el navegador, Next.js renderiza `layout.tsx`, que envuelve a `page.tsx`. La página instancia `TaskApp`, que gestiona todas las tareas y pinta un `Card` por cada una.

---

## Archivos y funciones

### `layout.tsx`

Archivo raíz que Next.js exige. Define la estructura HTML base (`<html>`, `<body>`) que envuelve todas las páginas de la app.

- **`RootLayout({ children })`** — Componente servidor. Recibe como `children` el contenido de la página activa (`page.tsx`) e inyecta las fuentes Geist desde Google Fonts. Carga `globals.css` una sola vez para toda la aplicación.

---

### `page.tsx`

Define la ruta `/` (página de inicio). En Next.js, cada `page.tsx` dentro de `app/` corresponde a una URL.

- **`Home()`** — Componente servidor. Su único trabajo es renderizar `<TaskApp />`, delegando toda la interactividad al Client Component.

---

### `components/TaskApp.tsx`

Marcado con `'use client'` porque usa `useState`. Contiene todo el estado de la lista de tareas y los manejadores de eventos.

**Interfaz `TodoListProps`**

Define la forma de cada tarea:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | `string` | Identificador único (UUID) |
| `title` | `string` | Texto de la tarea |
| `startDate` | `number?` | Timestamp de cuando se inició |
| `endDate` | `number?` | Timestamp de cuando se terminó |
| `state` | `'pending' \| 'inProgress' \| 'done'` | Estado actual |

**Estado (`useState`)**

- `valor` — Texto del input para escribir el nombre de la nueva tarea.
- `todoList` — Arreglo de tareas activas.

**Funciones**

- **`addTask()`** — Valida que el input no esté vacío, crea una tarea nueva con `crypto.randomUUID()` en estado `'pending'` y la agrega al arreglo. Limpia el input.

- **`startTask(id)`** — Busca la tarea por `id`, cambia su `state` a `'inProgress'` y guarda el timestamp actual en `startDate`. Fuerza re-render con spread `[...todoList]`.

- **`endTask(id)`** — Busca la tarea por `id`, cambia su `state` a `'done'` y guarda el timestamp en `endDate`.

- **`deleteTask(id)`** — Filtra el arreglo eliminando la tarea con ese `id`.

**Render**

Muestra un `<input>` + `<button>` para agregar tareas. Luego itera `todoList` con `.map()` y renderiza un `<Card>` por cada tarea, pasándole sus datos y los manejadores como props.

---

### `components/Card.tsx`

Marcado con `'use client'` porque usa `useState` y `useEffect`. Representa visualmente una tarea individual con su temporizador en tiempo real.

**Props recibidas**

| Prop | Tipo | Descripción |
|---|---|---|
| `description` | `string` | Texto de la tarea |
| `state` | `'pending' \| 'inProgress' \| 'done'` | Estado actual |
| `startDate` | `number?` | Timestamp de inicio (para el timer) |
| `endDate` | `number?` | Timestamp de fin |
| `id` | `string` | Identificador de la tarea |
| `handleStart` | `(id) => void` | Callback para iniciar |
| `handleEnd` | `(id) => void` | Callback para finalizar |
| `handleDelete` | `(id) => void` | Callback para eliminar |

**Estado (`useState`)**

- `TimeInProgress` — String con el tiempo formateado `HH:MM:SS` que se actualiza cada segundo.

**`useEffect([startDate])`**

Se ejecuta cuando cambia `startDate`. Si no hay `startDate`, no hace nada. Si existe, crea un `setInterval` de 1000ms que:
1. Calcula la diferencia `Date.now() - startDate`.
2. Convierte el resultado a una fecha ISO y extrae los caracteres `[11..19]` (`HH:MM:SS`).
3. Actualiza `TimeInProgress`.

El cleanup del efecto (`return () => clearInterval`) detiene el intervalo cuando el componente se desmonta o `startDate` cambia.

**Render condicional de botones**

- `state === 'pending'` → botón **"Iniciar tarea"** → llama `handleStart(id)`
- `state === 'inProgress'` → botón **"Finalizar tarea"** → llama `handleEnd(id)`
- `state === 'done'` → botón **"Eliminar"** → llama `handleDelete(id)`

Las clases CSS `card-ip` y `card-done` cambian el color de fondo según el estado.

---

### `globals.css`

Estilos globales cargados una vez por `layout.tsx`.

| Clase | Descripción |
|---|---|
| `.card2` | Estilo base de la tarjeta (fondo azul oscuro, bordes redondeados) |
| `.card-ip` | Sobrescribe el fondo a verde (`greenyellow`) cuando la tarea está en progreso |
| `.card-done` | Sobrescribe el fondo a violeta (`blueviolet`) cuando la tarea está terminada |

---

## Diferencia clave: React puro vs Next.js

| Concepto | React / Vite | Next.js |
|---|---|---|
| Punto de entrada | `main.tsx` monta `<App />` en el DOM | `layout.tsx` + `page.tsx` (convención de rutas) |
| Componentes con hooks | Todos son client por defecto | Deben marcarse con `'use client'` |
| CSS global | Importado en `main.tsx` | Importado en `layout.tsx` |
| Rutas | Librería externa (React Router) | Sistema de archivos integrado en `app/` |
