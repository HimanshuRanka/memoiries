import { NextResponse } from "next/server"
import { setNewMemory } from "@/lib/mongodb"

export async function POST() {
  try {
    await setNewMemory()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to set new memory:", error)
    return NextResponse.json({ success: false, error: "Failed to set new memory" }, { status: 500 })
  }
}