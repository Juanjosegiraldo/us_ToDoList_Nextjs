'use client'

import { useEffect, useState } from 'react'
import { Card } from './Card'

const STORAGE_KEY = 'task-timer-tasks'

interface TodoListProps {
  id: string
  title: string
  startDate?: number | undefined
  endDate?: number | undefined
  state: 'pending' | 'inProgress' | 'done'
}

export default function TaskApp() {
  const [valor, setValor] = useState('')
  const [todoList, setTodoList] = useState<TodoListProps[]>([])
  const [loaded, setLoaded] = useState(false)

  // Cargar tareas guardadas al montar (solo en cliente)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setTodoList(JSON.parse(saved))
      } catch {
        // Si el JSON está corrupto, empezamos limpio
      }
    }
    setLoaded(true)
  }, [])

  // Guardar en cada cambio (después de la carga inicial)
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))
  }, [todoList, loaded])

  const addTask = () => {
    if (valor.trim() === '') return
    const newTask: TodoListProps = {
      id: crypto.randomUUID(),
      title: valor.trim(),
      state: 'pending',
    }
    setTodoList([...todoList, newTask])
    setValor('')
  }

  const startTask = (id: string) => {
    setTodoList(todoList.map((task) =>
      task.id === id ? { ...task, state: 'inProgress', startDate: Date.now() } : task
    ))
  }

  const endTask = (id: string) => {
    setTodoList(todoList.map((task) =>
      task.id === id ? { ...task, state: 'done', endDate: Date.now() } : task
    ))
  }

  const deleteTask = (id: string) => {
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
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={addTask}
        >
          Agregar tarea
        </button>
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
