"use server"

import { saveMood as saveMoodDB } from "@/lib/mongodb"

export async function saveMood(moods: string[]) {
  try {
    await saveMoodDB(moods)
    return { success: true }
  } catch (error) {
    console.error("Failed to save mood:", error)
    return { success: false, error: "Failed to save mood" }
  }
}

