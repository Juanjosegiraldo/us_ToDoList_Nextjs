'use client'

import { useEffect, useState } from 'react'
import { Button } from '@heroui/react'
import { Card } from './Card'

interface TodoListProps {
  id: string
  title: string
  startDate?: number | undefined
  endDate?: number | undefined
  state: 'pending' | 'inProgress' | 'done'
}

// Convierte un documento de Mongo al shape que usa el componente
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapTask = (doc: any): TodoListProps => ({
  id: doc._id,
  title: doc.title,
  state: doc.state,
  startDate: doc.startDate ? new Date(doc.startDate).getTime() : undefined,
  endDate: doc.endDate ? new Date(doc.endDate).getTime() : undefined,
})

export default function TaskApp() {
  const [valor, setValor] = useState('')
  const [todoList, setTodoList] = useState<TodoListProps[]>([])

  // Cargar tareas desde la API (Mongo) al montar
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/todolist')
      const json = await res.json()
      setTodoList(json.data.map(mapTask))
    }
    fetchTasks()
  }, [])

  const addTask = async () => {
    if (valor.trim() === '') return
    const res = await fetch('/api/todolist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: valor.trim(), state: 'pending' }),
    })
    const json = await res.json()
    setTodoList([...todoList, mapTask(json.data)])
    setValor('')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTask = async (id: string, cambios: any) => {
    const res = await fetch(`/api/todolist/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cambios),
    })
    const json = await res.json()
    setTodoList(todoList.map((task) => (task.id === id ? mapTask(json.data) : task)))
  }

  const startTask = (id: string) => updateTask(id, { state: 'inProgress', startDate: Date.now() })

  const endTask = (id: string) => updateTask(id, { state: 'done', endDate: Date.now() })

  const deleteTask = async (id: string) => {
    await fetch(`/api/todolist/${id}`, { method: 'DELETE' })
    setTodoList(todoList.filter((task) => task.id !== id))
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Task Timer</h1>

      <div className="flex gap-2 mb-8">
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setValor(e.target.value)}
          value={valor}
          placeholder="Nueva tarea..."
        />
        <Button variant="primary" onPress={addTask}>
          Agregar tarea
        </Button>
      </div>

      <div className="flex flex-col items-center w-full max-w-sm">
        {todoList.length === 0 && (
          <p className="text-gray-500">No hay tareas. ¡Crea una para empezar!</p>
        )}
        {todoList.map((task) => (
          <Card
            key={task.id}
            description={task.title}
            state={task.state}
            startDate={task.startDate}
            endDate={task.endDate}
            id={task.id}
            handleStart={startTask}
            handleEnd={endTask}
            handleDelete={deleteTask}
          />
        ))}
      </div>
    </main>
  )
}
