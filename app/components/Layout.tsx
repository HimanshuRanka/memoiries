"use client"

import { motion } from "framer-motion"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="backdrop-blur-lg bg-white bg-opacity-20 rounded-xl shadow-lg p-6">{children}</div>
    </motion.div>
  )
}