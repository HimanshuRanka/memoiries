import type { ObjectId } from "mongodb"




export interface Memory {
  _id: ObjectId
  type: "song" | "photo" | "letter"
  content: string
  note: string
  senderName: string
  createdAt: Date
  image?: Buffer
  base64image?: string
}

export interface Settings {
  receiveMemories: boolean
  frequency: "daily" | "every3days" | "weekly" | "biweekly" | "monthly"
  time: string
  dayOfWeek?: string
  dayOfMonth?: string
  notificationTypes: ("email" | "text")[]
}

export interface DailyRecord {
  date: string
  memoryId: string
  affirmationCompleted: boolean
  moods: string[]
}