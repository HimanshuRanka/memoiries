"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export interface Mood {
  name: string
  color: string
}

export const moods: Mood[] = [
  { name: "Angry", color: "rgba(255, 0, 0, 0.5)" },
  { name: "Excited", color: "rgba(255, 69, 0, 0.5)" },
  { name: "Happy", color: "rgba(255, 215, 0, 0.5)" },
  { name: "Content", color: "rgba(50, 205, 50, 0.5)" },
  { name: "Calm", color: "rgba(0, 191, 255, 0.5)" },
  { name: "Sad", color: "rgba(65, 105, 225, 0.5)" },
  { name: "Anxious", color: "rgba(153, 50, 204, 0.5)" },
  { name: "Surprised", color: "rgba(255, 105, 180, 0.5)" },
  { name: "Tired", color: "rgba(139, 69, 19, 0.5)" },
  { name: "Neutral", color: "rgba(169, 169, 169, 0.5)" },
]

interface MoodSelectorProps {
  onMoodSelect: (selectedMoods: Mood[]) => void
}

export function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([])

  const toggleMood = (mood: Mood) => {
    setSelectedMoods((prevMoods) => {
      const isSelected = prevMoods.some((m) => m.name === mood.name)
      if (isSelected) {
        return prevMoods.filter((m) => m.name !== mood.name)
      } else {
        return [...prevMoods, mood]
      }
    })
  }

  const handleLogMood = () => {
    onMoodSelect(selectedMoods)
  }

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold text-white">How are you feeling today?</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {moods.map((mood) => (
          <Button
            key={mood.name}
            onClick={() => toggleMood(mood)}
            className={`
              text-white transition-all duration-200 ease-in-out
              ${selectedMoods.some((m) => m.name === mood.name) ? "ring-2 ring-white scale-105" : "hover:scale-105"}
            `}
            style={{
              backgroundColor: mood.color,
            }}
          >
            {mood.name}
          </Button>
        ))}
      </div>
      <Button onClick={handleLogMood} className="w-full max-w-xs mx-auto">
        Log Mood
      </Button>
    </div>
  )
}