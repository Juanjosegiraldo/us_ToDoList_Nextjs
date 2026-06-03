# Task Timer — To-Do List

Aplicación de lista de tareas con cronómetro construida con **Next.js (App Router)**, **MongoDB/Mongoose** y **HeroUI**. Permite crear tareas, iniciarlas y finalizarlas registrando la fecha de inicio y fin, y eliminarlas. Toda la información se persiste en una base de datos MongoDB.

🔗 **Demo en vivo:** [https://us-to-do-list-nextjs.vercel.app/](https://us-to-do-list-nextjs.vercel.app/)

## ¿Qué hace?

- **Crear tareas:** escribe un título y agrégalo a la lista. Cada tarea nace en estado `pending`.
- **Iniciar una tarea:** al iniciarla pasa a estado `inProgress` y se guarda la fecha de inicio (`startDate`).
- **Finalizar una tarea:** al terminarla pasa a estado `done` y se guarda la fecha de fin (`endDate`), permitiendo conocer cuánto tomó.
- **Eliminar tareas:** borra una tarea de la lista y de la base de datos.

Los tres estados posibles de una tarea son: `pending`, `inProgress` y `done`.

## Tecnologías

- [Next.js 16](https://nextjs.org) (App Router + Route Handlers)
- [React 19](https://react.dev)
- [MongoDB](https://www.mongodb.com) con [Mongoose](https://mongoosejs.com)
- [HeroUI](https://www.heroui.com) y [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript

## API

La lógica de datos se expone mediante Route Handlers:

| Método | Ruta                  | Descripción                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | `/api/todolist`       | Lista todas las tareas               |
| POST   | `/api/todolist`       | Crea una nueva tarea                 |
| PUT    | `/api/todolist/[id]`  | Actualiza una tarea (estado/fechas)  |
| DELETE | `/api/todolist/[id]`  | Elimina una tarea                    |

## Variables de entorno

Crea un archivo `.env.local` con la cadena de conexión a tu base de datos MongoDB (por ejemplo, MongoDB Atlas):

```bash
MONGODB_URI="tu-cadena-de-conexion"
```

## Cómo ejecutar

Instala las dependencias y levanta el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts disponibles

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run start   # ejecuta el build de producción
npm run lint    # análisis de código con ESLint
```

## Despliegue

La aplicación está desplegada en **Vercel**: [https://us-to-do-list-nextjs.vercel.app/](https://us-to-do-list-nextjs.vercel.app/)
