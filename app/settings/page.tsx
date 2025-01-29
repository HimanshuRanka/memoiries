"use client"

import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { saveSettings, getSettings } from "../actions/settings"
import { useToast } from "@/components/ui/use-toast"
import type { Settings } from "@/types/memory"

export default function Settings() {
  const [settings, setSettings] = useState<Settings>({
    receiveMemories: true,
    frequency: "daily",
    time: "12:00",
    notificationTypes: ["text"],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function loadSettings() {
      const savedSettings = await getSettings()
      if (savedSettings) {
        setSettings(savedSettings)
      }
      setIsLoading(false)
    }
    loadSettings()
  }, [])

  useEffect(() => {
    if (settings.notificationTypes.length === 0) {
      setSettings((prev) => ({ ...prev, receiveMemories: false }))
    }
  }, [settings.notificationTypes])

  useEffect(() => {
    if (settings.receiveMemories && settings.notificationTypes.length === 0) {
      setSettings((prev) => ({ ...prev, notificationTypes: ["text"] }))
    }
  }, [settings.receiveMemories])

  function toggleNotificationType(type: "email" | "text") {
    setSettings((prev) => {
      const newTypes = prev.notificationTypes.includes(type)
        ? prev.notificationTypes.filter((t) => t !== type)
        : [...prev.notificationTypes, type]
      return { ...prev, notificationTypes: newTypes }
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)

    const formData = new FormData(event.currentTarget)
    try {
      const result = await saveSettings(formData)
      if (result.success) {
        toast({
          title: "Success",
          description: "Settings saved successfully!",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center text-white">Loading settings...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="text-white mb-2 block">Receive memories on schedule?</Label>
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              variant={settings.receiveMemories ? "default" : "secondary"}
              onClick={() => setSettings((s) => ({ ...s, receiveMemories: true }))}
              className="flex-1 backdrop-blur-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
            >
              Yes
            </Button>
            <Button
              type="button"
              variant={!settings.receiveMemories ? "default" : "secondary"}
              onClick={() => setSettings((s) => ({ ...s, receiveMemories: false }))}
              className="flex-1 backdrop-blur-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
            >
              No
            </Button>
          </div>
          <input type="hidden" name="receiveMemories" value={settings.receiveMemories.toString()} />
        </div>

        {settings.receiveMemories && (
          <>
            <div>
              <Label htmlFor="frequency" className="text-white mb-2 block">
                How often do you want to receive memories?
              </Label>
              <Select
                name="frequency"
                value={settings.frequency}
                onValueChange={(value) => setSettings((s) => ({ ...s, frequency: value as Settings["frequency"] }))}
              >
                <SelectTrigger id="frequency" className="bg-white bg-opacity-20 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Every day</SelectItem>
                  <SelectItem value="every3days">Every 3 days</SelectItem>
                  <SelectItem value="weekly">Every week</SelectItem>
                  <SelectItem value="biweekly">Every 2 weeks</SelectItem>
                  <SelectItem value="monthly">Every month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="time" className="text-white mb-2 block">
                At what time?
              </Label>
              <Input
                type="time"
                id="time"
                name="time"
                value={settings.time}
                onChange={(e) => setSettings((s) => ({ ...s, time: e.target.value }))}
                className="bg-white bg-opacity-20 text-white"
              />
            </div>

            {(settings.frequency === "weekly" || settings.frequency === "biweekly") && (
              <div>
                <Label htmlFor="dayOfWeek" className="text-white mb-2 block">
                  On which day of the week?
                </Label>
                <Select
                  name="dayOfWeek"
                  value={settings.dayOfWeek}
                  onValueChange={(value) => setSettings((s) => ({ ...s, dayOfWeek: value }))}
                >
                  <SelectTrigger id="dayOfWeek" className="bg-white bg-opacity-20 text-white">
                    <SelectValue placeholder="Select day of week" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {settings.frequency === "monthly" && (
              <div>
                <Label htmlFor="dayOfMonth" className="text-white mb-2 block">
                  On which day of the month?
                </Label>
                <Select
                  name="dayOfMonth"
                  value={settings.dayOfMonth}
                  onValueChange={(value) => setSettings((s) => ({ ...s, dayOfMonth: value }))}
                >
                  <SelectTrigger id="dayOfMonth" className="bg-white bg-opacity-20 text-white">
                    <SelectValue placeholder="Select day of month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label className="text-white mb-2 block">How do you want to receive memories?</Label>
              <div className="flex justify-center gap-4">
                <Button
                  type="button"
                  variant={settings.notificationTypes.includes("email") ? "default" : "secondary"}
                  onClick={() => toggleNotificationType("email")}
                  className="flex-1 backdrop-blur-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                >
                  Email
                </Button>
                <Button
                  type="button"
                  variant={settings.notificationTypes.includes("text") ? "default" : "secondary"}
                  onClick={() => toggleNotificationType("text")}
                  className="flex-1 backdrop-blur-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                >
                  Text Message
                </Button>
              </div>
              <input type="hidden" name="notificationTypes" value={settings.notificationTypes.join(",")} />
            </div>
          </>
        )}

        <Button
          type="submit"
          className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </Layout>
  )
}

