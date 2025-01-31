"use client"

import { motion } from "framer-motion"
import {Pause, Play} from "lucide-react"
import type { Memory } from "@/types/memory"
import {useEffect, useState} from "react"

interface VinylProps {
  memory: Omit<Memory, "_id">
}

export function Vinyl({ memory }: VinylProps) {
  const [albumCover, setAlbumCover] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const fetchAlbumCover = async () => {
      const trackId = memory.content.split("/").pop()?.split("?")[0]
       let accessToken = await fetch('/api/spotify-access-token', {
         headers: {
           'Cache-Control': 'no-store',
           'Pragma': 'no-cache',         // For older HTTP/1.0 clients (legacy support)
           'Expires': '0',               // Ensures response is considered expired immediately
         },
         cache: 'no-store'
       })
          .then(res => res.json())
          .then(data => data.access_token)
      let response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (response.status === 401) {
        // Access token expired, get a new one
        accessToken = await fetch('/api/spotify-access-token')
            .then(res => res.json())
            .then(data => data.access_token)

        response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      }
      const data = await response.json()
      setAlbumCover(data.album.images[0].url ?? '')
    }

    if(memory.content.includes("spotify")) {
      fetchAlbumCover()
    } else {
        setAlbumCover("");
    }
  }, [memory.content])

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying)
  }


  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="relative aspect-square mb-6">
          <div className="absolute inset-0 bg-gray-700 rounded-lg shadow-inner"></div>
          <motion.div
            className="absolute inset-4"
            animate={{rotate: isPlaying ? [0, 360] : 0 }}
            transition={{ duration: isPlaying ? 20 : 0.1, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
          >
            {/* Vinyl Record */}
            <div className="absolute inset-0 rounded-full bg-black shadow-xl">
              <div className="absolute inset-2 rounded-full border-4 border-gray-800">
                <div className="absolute inset-8 rounded-full border border-gray-700" />
                <div className="absolute inset-[4rem] rounded-full bg-gray-800 flex items-center justify-center">
                  <div
                    className="p-8 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
                    aria-label="Play song"
                    style={{ backgroundImage: `url(${albumCover})`, backgroundSize: 'cover' }}
                  >
                    {isPlaying ? <Pause className="w-12 h-12 text-white" onClick={handlePlayClick}/> : <Play className="w-12 h-12 text-white" onClick={handlePlayClick}  />}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Record player arm */}
          <div className="absolute top-0 right-0 w-1/4 h-full">
            <motion.div
                animate={{rotate: isPlaying ? [90, 76, 68] : 90}}
                transition={{times: [0, 0.01, 1], duration: isPlaying ? 60 : 0.5, ease: "linear"}}
                className={`absolute shadow-2xl top-[7px] right-0 w-2 h-3/4 bg-gray-200 rounded-t-full origin-top-right`}>
              <div className="absolute top-0 left-0 w-4 h-6 bg-yellow-900 rounded"/>
              <div className="absolute bottom-0 left-0 w-3 h-6 bg-gray-900 "/>
            </motion.div>
          </div>
        </div>

        {/* Digital Display */}
        <div className="bg-white bg-opacity-20 border border-white border-opacity-20 rounded-lg p-4 space-y-2 flex flex-col">
          <p className="text-white text-center">{memory.note}</p>
          <p className="text-white text-opacity-70 text-center text-sm">Shared by {memory.senderName}</p>
          <a className={"mt-4 text-white w-full text-center p-2 border border-white rounded"} rel={"noreferrer noopener"} target={"_blank"} href={memory.content}>Go to Song</a>
        </div>
      </div>


    </motion.div>
  )
}