"use server"

import { saveSettings as saveSettingsDB, getSettings as getSettingsDB } from "@/lib/mongodb"
import type { Settings } from "@/types/memory"

export async function saveSettings(formData: FormData) {
  const settings: Settings = {
    receiveMemories: formData.get("receiveMemories") === "true",
    frequency: formData.get("frequency") as Settings["frequency"],
    time: formData.get("time") as string,
    dayOfWeek: formData.get("dayOfWeek") as string,
    dayOfMonth: formData.get("dayOfMonth") as string,
    notificationTypes: (formData.get("notificationTypes") as string).split(",") as ("email" | "text")[],
  }

  try {
    await saveSettingsDB(settings)
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to save settings" }
  }
}

export async function getSettings() {
  try {
    return await getSettingsDB()
  } catch (error) {
    console.error("Failed to fetch settings:", error)
    return null
  }
}

