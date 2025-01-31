"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { Memory } from "@/types/memory"

interface PolaroidProps {
  memories: Omit<Memory, "_id">[]
}

export function Polaroid({ memories }: PolaroidProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleClick = () => {
    if (memories.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length)
    }
  }

  const memory = memories[currentIndex]

  return (
    <div className="relative w-64 h-80 cursor-pointer" onClick={handleClick}>
      <AnimatePresence>
        <motion.div
          className="absolute w-full h-full"
          initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1, zIndex: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white p-4 shadow-xl w-full h-full">
            <div className="relative aspect-square mb-4">
              <Image src={memory.base64image ?? "/placeholder.svg"} alt="Memory" fill className="object-cover" />
            </div>
            <div className="text-center space-y-2 pb-2">
              <p className="text-gray-700 font-handwriting text-sm">{memory.note}</p>
              <p className="text-gray-500 text-xs">~ {memory.senderName}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}