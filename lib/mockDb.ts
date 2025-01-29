import type { Memory, Settings } from "@/types/memory"

interface DailyRecord {
  date: string
  memoryId: string
  affirmationCompleted: boolean
  moods: string[]
}

class MockDb {
  private memories: Memory[] = [
    {
      _id: "1",
      type: "letter",
      content:
        "I hope this letter finds you well. I wanted to take a moment to tell you how much your friendship means to me. You've been there for me through thick and thin, and I'm grateful for every moment we've shared.\n\nRemember that time we got lost in the city and ended up discovering that amazing little café? Or when we stayed up all night talking about our dreams and fears? These are the moments that I cherish most.\n\nThank you for being you, and for being such an important part of my life.",
      note: "A reminder of our wonderful friendship",
      senderName: "Sarah",
      createdAt: new Date("2023-05-15T10:30:00Z"),
    },
    {
      _id: "2",
      type: "photo",
      content: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
      note: "That unforgettable sunset at the beach",
      senderName: "Alex",
      createdAt: new Date("2023-06-22T18:45:00Z"),
    },
    {
      _id: "3",
      type: "song",
      content: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
      note: "Our favorite song from the road trip last summer",
      senderName: "Jamie",
      createdAt: new Date("2023-07-10T14:20:00Z"),
    },
    {
      _id: "4",
      type: "photo",
      content: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=800&q=80",
      note: "Our hiking adventure in the mountains",
      senderName: "Alex",
      createdAt: new Date("2023-08-05T09:15:00Z"),
    },
    {
      _id: "5",
      type: "photo",
      content: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
      note: "Remember when we found this cute puppy?",
      senderName: "Alex",
      createdAt: new Date("2023-09-18T16:30:00Z"),
    },
  ]
  private settings: Settings | null = null
  private dailyRecords: DailyRecord[] = []
  private currentRecord: DailyRecord | null = null

  async createMemory(memory: Omit<Memory, "_id" | "createdAt">): Promise<Memory> {
    const newMemory: Memory = {
      ...memory,
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    }
    this.memories.push(newMemory)
    return newMemory
  }

  async getAllMemories(): Promise<Memory[]> {
    return this.memories
  }

  async getRandomMemory(): Promise<Memory | null> {
    if (this.memories.length === 0) return null
    const randomIndex = Math.floor(Math.random() * this.memories.length)
    return this.memories[randomIndex]
  }

  async saveSettings(settings: Settings): Promise<void> {
    this.settings = settings
  }

  async getSettings(): Promise<Settings | null> {
    return this.settings
  }

  async saveMood(moods: string[]): Promise<void> {
    const currentRecord = await this.getCurrentRecord()
    if (currentRecord) {
      currentRecord.moods = moods
    }
  }

  async getMood(date: string): Promise<string[] | null> {
    const mood = this.moods.find((m) => m.date === date)
    return mood ? mood.moods : null
  }

  async getCurrentRecord(): Promise<DailyRecord | null> {
    const today = new Date().toISOString().split("T")[0]
    if (!this.currentRecord || this.currentRecord.date !== today) {
      this.currentRecord = this.dailyRecords.find((record) => record.date === today) || {
        date: today,
        memoryId: this.getRandomMemoryId(),
        affirmationCompleted: false,
        moods: [],
      }
      this.dailyRecords = this.dailyRecords.filter((record) => record.date !== today)
      this.dailyRecords.push(this.currentRecord)
    }
    return this.currentRecord
  }

  async setNewMemory(memoryId: string): Promise<void> {
    const currentRecord = await this.getCurrentRecord()
    if (currentRecord) {
      currentRecord.memoryId = memoryId
    }
  }

  async completeAffirmation(): Promise<void> {
    const currentRecord = await this.getCurrentRecord()
    if (currentRecord) {
      currentRecord.affirmationCompleted = true
    }
  }

  private getRandomMemoryId(): string {
    const randomIndex = Math.floor(Math.random() * this.memories.length)
    return this.memories[randomIndex]._id
  }

  async getMemoryById(id: string): Promise<Memory | null> {
    return this.memories.find((memory) => memory._id === id) || null
  }
}

const mockDb = new MockDb()
export default mockDb

