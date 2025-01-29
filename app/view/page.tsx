"use client"

import { useState, useEffect } from "react"
import { Suspense } from "react"
import Layout from "../components/Layout"
import { Letter } from "../components/memories/Letter"
import { Polaroid } from "../components/memories/Polaroid"
import { Vinyl } from "../components/memories/Vinyl"
import { getCurrentMemory, completeAffirmation } from "../actions/memories"
import { Button } from "@/components/ui/button"
import { AffirmationStep } from "../components/AffirmationStep"
import {MoodSelector, type Mood, moods} from "../components/MoodSelector"
import { useRouter } from "next/navigation"
import { saveMood } from "../actions/mood"

function blendColors(colors: string[]): string {
  if (colors.length === 0) return "rgba(255, 255, 255, 0.5)"
  const rgbaColors = colors.map((color) => {
    const [r, g, b, a] = color.slice(5, -1).split(",").map(Number)
    return [r, g, b, a]
  })
  const avg = rgbaColors
    .reduce((acc, [r, g, b, a]) => [acc[0] + r, acc[1] + g, acc[2] + b, acc[3] + a], [0, 0, 0, 0])
    .map((val) => val / colors.length)
  return `rgba(${avg[0]}, ${avg[1]}, ${avg[2]}, ${avg[3]})`
}

export default function View() {
  const [showMemory, setShowMemory] = useState(false)
  const [affirmationCompleted, setAffirmationCompleted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAffirmationStatus = async () => {
      const currentRecord = await getCurrentMemory()
      if (currentRecord) {
        setAffirmationCompleted(currentRecord.dailyRecordData.affirmationCompleted)
        setShowMemory(currentRecord.dailyRecordData.affirmationCompleted)
      }
    }
    checkAffirmationStatus()
  }, [])

  const handleAffirmationComplete = async () => {
    await completeAffirmation()
    setAffirmationCompleted(true)
    setShowMemory(true)
  }

  const handleViewAnotherMemory = async () => {
    const response = await fetch("/api/set-new-memory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memoryId: "random" }),
    })
    if (response.ok) {
      router.refresh()
    }
  }

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto px-4">
        {!affirmationCompleted ? (
          <AffirmationStep onComplete={handleAffirmationComplete} />
        ) : (
          <Suspense fallback={<div className="text-center text-white">Loading memory...</div>}>
            <MemoryView onViewAnother={handleViewAnotherMemory} />
          </Suspense>
        )}
      </div>
    </Layout>
  )
}

function MemoryView({ onViewAnother }: { onViewAnother: () => void }) {
  const [memory, setMemory] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [moodLogged, setMoodLogged] = useState(false)
  const [moodBar, setMoodBar] = useState<string | null>(null)

  useEffect(() => {
    getCurrentMemory().then((mem) => {
      setMemory(mem?.memory)
      setIsLoading(false)
      if (mem && mem.dailyRecordData.moods && mem.dailyRecordData.moods.length > 0) {
        setMoodLogged(true)
        setMoodBar(blendColors(mem.dailyRecordData.moods.map((mood) => moods.find(m => m.name == mood)?.color ?? "rgba(255, 255, 255, 0.5)")))
      }
    })
  }, [])

  const handleMoodSelect = async (selectedMoods: Mood[]) => {
    const blendedColor = blendColors(selectedMoods.map((mood) => mood.color))
    setMoodBar(blendedColor)
    setMoodLogged(true)
    await saveMood(selectedMoods.map((mood) => mood.name))
  }

  if (isLoading) {
    return <div className="text-center text-white">Loading memory...</div>
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Today's Memory</h1>
      {memory ? (
        <div className={"flex items-center justify-center w-full"}>
          {memory.type === "letter" && <Letter memory={memory} />}
          {memory.type === "photo" && <Polaroid memories={[memory]} />}
          {memory.type === "song" && <Vinyl memory={memory} />}
        </div>
      ) : (
        <div className="text-center text-white">No memories found. Why not create one?</div>
      )}
      {!moodLogged ? (
        <div className="mt-8">
          <MoodSelector onMoodSelect={handleMoodSelect} />
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          <div className="h-16 rounded-full backdrop-blur-md" style={{ backgroundColor: moodBar || undefined }}></div>
          <p className="text-center text-white">Your mood has been logged for today.</p>
        </div>
      )}
      <div className="mt-8 flex justify-center">
        <Button onClick={onViewAnother}>View Another Memory</Button>
      </div>
    </>
  )
}