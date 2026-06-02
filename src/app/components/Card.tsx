'use client'

import { useEffect, useState } from 'react'

interface CardProps {
  description: string
  state: 'pending' | 'inProgress' | 'done'
  startDate: number | undefined
  endDate: number | undefined
  id: string
  handleStart: (id: string) => void
  handleEnd: (id: string) => void
  handleDelete: (id: string) => void
}

export const Card = ({
  description,
  state,
  startDate,
  endDate,
  id,
  handleStart,
  handleEnd,
  handleDelete,
}: CardProps) => {
  const [TimeInProgress, setTimeInProgress] = useState('')

  const displayTime =
    startDate && endDate
      ? new Date(endDate - startDate).toISOString().slice(11, 19)
      : TimeInProgress

  useEffect(() => {
    if (!startDate || endDate) {
      return
    }
    const interval = setInterval(() => {
      setTimeInProgress(new Date(Date.now() - startDate).toISOString().slice(11, 19))
    }, 1000)
    return () => clearInterval(interval)
  }, [startDate, endDate])

  return (
    <div
      className={`card2 ${state == 'inProgress' ? 'card-ip' : ''} ${state == 'done' ? 'card-done' : ''}`}
    >
      <p className="font-semibold text-base">{description}</p>
      <span className="text-sm opacity-80 capitalize">{state}</span>
      {startDate && (
        <span className="text-xs opacity-70">Tiempo: {displayTime}</span>
      )}

      {state == 'pending' && (
        <button
          className="mt-1 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded transition-colors self-start"
          onClick={() => handleStart(id)}
        >
          Iniciar tarea
        </button>
      )}

      {state == 'inProgress' && (
        <button
          className="mt-1 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded transition-colors self-start"
          onClick={() => handleEnd(id)}
        >
          Finalizar tarea
        </button>
      )}

      {state == 'done' && (
        <button
          className="mt-1 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded transition-colors self-start"
          onClick={() => handleDelete(id)}
        >
          Eliminar
        </button>
      )}
    </div>
  )
}
