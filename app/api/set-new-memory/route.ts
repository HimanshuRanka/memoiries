import { NextResponse } from "next/server"
import { setNewMemory } from "@/lib/mongodb"

export async function POST(request: Request) {
  const { memoryId } = await request.json()

  if (!memoryId) {
    return NextResponse.json({ success: false, error: "Memory ID is required" }, { status: 400 })
  }

  try {
    await setNewMemory(memoryId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to set new memory:", error)
    return NextResponse.json({ success: false, error: "Failed to set new memory" }, { status: 500 })
  }
}

