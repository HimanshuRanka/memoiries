"use client"

import { useState, useEffect } from "react"

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 80%)`
}

export function RandomBackground() {
  const [colors, setColors] = useState(["#f9a8d4", "#c4b5fd", "#93c5fd"]) // Default pink, purple, indigo

  useEffect(() => {
    setColors([getRandomColor(), getRandomColor(), getRandomColor()])
  }, [])

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
      }}
    />
  )
}

