"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const affirmations = [
  "I am capable of amazing things",
  "Today is full of possibilities",
  "I choose to be happy",
  "I am worthy of love and respect",
  "I believe in myself",
]

interface AffirmationStepProps {
  onComplete: () => void
}

export function AffirmationStep({ onComplete }: AffirmationStepProps) {
  const [affirmation, setAffirmation] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isButtonActive, setIsButtonActive] = useState(false)

  useEffect(() => {
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)])
  }, [])

  useEffect(() => {
    setIsButtonActive(userInput.toLowerCase() === affirmation.toLowerCase())
  }, [userInput, affirmation])

  return (
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white">Today's Affirmation</h2>
      <p className="text-xl text-white">{affirmation}</p>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Type in affirmation to see memory"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50"
        />
        <Button
          onClick={onComplete}
          disabled={!isButtonActive}
          className="w-full hover:bg-white hover:bg-opacity-65 text-white"
        >
          View Today's Memory
        </Button>
      </div>
    </motion.div>
  )
}