"use server"

import {revalidatePath} from "next/cache"
import {completeAffirmation as completeAffirmationDB, createMemory, getCurrentRecord, setNewMemory} from "@/lib/mongodb"
import type {Memory} from "@/types/memory"

export async function createMemoryAction(formData: FormData) {
  const memory: Omit<Memory, "_id" | "createdAt"> = {
    type: formData.get("type") as Memory["type"],
    content: formData.get("content") as string,
    note: formData.get("note") as string,
    senderName: formData.get("senderName") as string,
  }

  if(memory.type === "photo") {
    const file = formData.get("content") as File;
    if (file && file.type.startsWith("image/")) {
      const arrayBuffer = await file.arrayBuffer();
      memory.image = Buffer.from(arrayBuffer);
      memory.content = file.name;
    }
  }

  try {
    await createMemory(memory)
    revalidatePath("/view")
    return { success: true }
  } catch (error) {
    console.error("Failed to create memory:", error)
    return { success: false, error: "Failed to create memory" }
  }
}

export async function getCurrentMemory() {
  try {
    const memoryDetails = await getCurrentRecord();
    return memoryDetails;
  } catch (error) {
    console.error("Failed to fetch current memory:", error)
    return null
  }
}

export async function completeAffirmation() {
  try {
    await completeAffirmationDB()
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to complete affirmation" }
  }
}