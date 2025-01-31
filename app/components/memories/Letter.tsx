"use client"

import { motion } from "framer-motion"
import type { Memory } from "@/types/memory"

interface LetterProps {
  memory: Omit<Memory, "_id">;
}

export function Letter({ memory }: LetterProps) {
  return (
    <motion.div
      className="max-w-2xl mx-auto p-8 bg-white bg-opacity-90 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4 font-serif">
        <div className="text-gray-600 text-right mb-8">{new Date(memory.createdAt).toLocaleDateString()}</div>
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{memory.content}</div>
        <div className="mt-8">
          <p className="text-gray-700">{memory.note}</p>
        </div>
        <div className="text-right mt-8">
          <p className="text-gray-800">With love,</p>
          <p className="text-gray-800 font-medium mt-2">{memory.senderName}</p>
        </div>
      </div>
    </motion.div>
  )
}