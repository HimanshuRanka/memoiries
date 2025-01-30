"use client"

import {useRef, useState} from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Music, Image, FileText } from "lucide-react"
import { createMemoryAction } from "../actions/memories"
import { useToast } from "@/hooks/use-toast"

export default function SubmissionForm() {
  const [submissionType, setSubmissionType] = useState<"song" | "photo" | "letter">("letter")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toastStuff = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  console.log("toaststuff",toastStuff);
  const {toast} = toastStuff;

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      formData.append("type", submissionType)
      const result = await createMemoryAction(formData)
      if (result.success) {
        toast({
          title: "Success",
          description: "Memory created successfully!",
        })
        formRef.current?.reset();
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create memory. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
        ref={formRef}
      action={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div>
        <Label htmlFor="senderName" className="text-white">
          Your Name
        </Label>
        <Input
          id="senderName"
          name="senderName"
          placeholder="Enter your name"
          required
          className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50"
        />
      </div>
      <div>
        <Label className="text-white mb-2 block">Submission Type</Label>
        <div className="flex justify-between gap-2">
          <Button
            type="button"
            onClick={() => setSubmissionType("song")}
            className={`flex-1 ${
              submissionType === "song" ? "bg-opacity-55" : ""
            } text-white`}
          >
            <Music className="mr-2 h-4 w-4" /> Song
          </Button>
          <Button
            type="button"
            onClick={() => setSubmissionType("photo")}
            className={`flex-1 ${
              submissionType === "photo" ? "bg-opacity-55" : ""
            } text-white`}
          >
            <Image className="mr-2 h-4 w-4" /> Photo
          </Button>
          <Button
            type="button"
            onClick={() => setSubmissionType("letter")}
            className={`flex-1 ${
              submissionType === "letter" ? "bg-opacity-55" : ""
            } text-white`}
          >
            <FileText className="mr-2 h-4 w-4" /> Letter
          </Button>
        </div>
      </div>

      {submissionType === "song" && (
        <div>
          <Label htmlFor="content" className="text-white">
            Song URL
          </Label>
          <Input
            id="content"
            name="content"
            placeholder="Enter song URL"
            className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50"
          />
        </div>
      )}

      {submissionType === "photo" && (
        <div>
          <Label htmlFor="content" className="text-white">
            Upload Photo
          </Label>
          <Input
            id="content"
            name="content"
            type="file"
            accept="image/*"
            className="bg-white bg-opacity-20 text-white file:text-white file:bg-transparent placeholder-white placeholder-opacity-50"
          />
        </div>
      )}

      <div>
        <Label htmlFor="note" className="text-white">
          {submissionType === "letter" ? "Letter" : "Note"}
        </Label>
        <Textarea
          id="note"
          name="note"
          placeholder={submissionType === "letter" ? "Write your letter here" : "Enter your note here"}
          className="bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50"
          rows={submissionType === "letter" ? 6 : 3}
        />
      </div>

      <Button type="submit" className="w-full text-white" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </motion.form>
  )
}