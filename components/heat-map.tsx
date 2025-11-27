"use client"

import { useEffect, useRef } from "react"

interface HeatMapEvent {
  lat: number
  lng: number
  intensity: number
  title: string
}

interface HeatMapProps {
  events: HeatMapEvent[]
}

export function HeatMap({ events }: HeatMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || events.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(200, 200, 200, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    events.forEach((event) => {
      const x = (event.lng / 360) * canvas.width + canvas.width / 2
      const y = (event.lat / 180) * canvas.height + canvas.height / 2

      const radius = event.intensity * 50
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `rgba(255, 107, 53, ${0.6 * event.intensity})`)
      gradient.addColorStop(1, `rgba(255, 107, 53, ${0.1 * event.intensity})`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [events])

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden bg-muted">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
