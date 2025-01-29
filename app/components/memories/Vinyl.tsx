"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import type { Memory } from "@/types/memory"

interface VinylProps {
  memory: Memory
}

export function Vinyl({ memory }: VinylProps) {
  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="relative aspect-square mb-6">
          <div className="absolute inset-0 bg-gray-700 rounded-lg shadow-inner"></div>
          <motion.div
            className="absolute inset-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {/* Vinyl Record */}
            <div className="absolute inset-0 rounded-full bg-black shadow-xl">
              <div className="absolute inset-2 rounded-full border-4 border-gray-800">
                <div className="absolute inset-8 rounded-full border border-gray-700" />
                <div className="absolute inset-[4rem] rounded-full bg-gray-800 flex items-center justify-center">
                  <a
                    href={memory.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-8 rounded-full bg-white bg-opacity-10 backdrop-blur-lg hover:bg-opacity-20 transition-colors"
                    aria-label="Play song"
                  >
                    <Play className="w-12 h-12 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Record player arm */}
          <div className="absolute top-0 right-0 w-1/4 h-1/2">
            <div className="absolute bottom-0 right-0 w-2 h-3/4 bg-gray-600 rounded-t-full origin-bottom-right rotate-45"></div>
          </div>
        </div>

        {/* Digital Display */}
        <div className="backdrop-blur-lg bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-4 space-y-2">
          <p className="text-white text-center">{memory.note}</p>
          <p className="text-white text-opacity-70 text-center text-sm">Shared by {memory.senderName}</p>
        </div>
      </div>
    </motion.div>
  )
}