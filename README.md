# Task Timer — To-Do List

A task list app with a timer built with **Next.js (App Router)**, **MongoDB/Mongoose**, and **HeroUI**. It lets you create tasks, start and finish them while recording their start and end dates, and delete them. All data is persisted in a MongoDB database.

🔗 **Live demo:** [https://us-to-do-list-nextjs.vercel.app/](https://us-to-do-list-nextjs.vercel.app/)

## What it does

- **Create tasks:** type a title and add it to the list. Each task starts in the `pending` state.
- **Start a task:** starting it moves it to the `inProgress` state and saves the start date (`startDate`).
- **Finish a task:** completing it moves it to the `done` state and saves the end date (`endDate`), so you can tell how long it took.
- **Delete tasks:** remove a task from the list and from the database.

A task can be in one of three states: `pending`, `inProgress`, and `done`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router + Route Handlers)
- [React 19](https://react.dev)
- [MongoDB](https://www.mongodb.com) with [Mongoose](https://mongoosejs.com)
- [HeroUI](https://www.heroui.com) and [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript

## API

Data logic is exposed through Route Handlers:

| Method | Route                 | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | `/api/todolist`       | List all tasks                       |
| POST   | `/api/todolist`       | Create a new task                    |
| PUT    | `/api/todolist/[id]`  | Update a task (state/dates)          |
| DELETE | `/api/todolist/[id]`  | Delete a task                        |

## Environment variables

Create a `.env.local` file with the connection string for your MongoDB database (e.g., MongoDB Atlas):

```bash
MONGODB_URI="your-connection-string"
```

## Running locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the code with ESLint
```

## Deployment

The app is deployed on **Vercel**: [https://us-to-do-list-nextjs.vercel.app/](https://us-to-do-list-nextjs.vercel.app/)
