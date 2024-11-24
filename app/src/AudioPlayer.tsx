import React, {MutableRefObject, useRef, useState} from "react"
import { Play, Pause, RotateCcw } from 'lucide-react'

interface Transcript {
  start: number
  end: number
  text: string
}

interface Props {
  audioSrc: string
  transcript: Array<Transcript>
  sessionInfo: {
    title: string
    // Any other info
  }
}

export default function AudioPlayer( props: Props ): React.JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const audioRef: MutableRefObject<any> = useRef(null)
  
  const getCurrentSegment: (time: number) => Transcript | undefined = (time: number): Transcript | undefined => {
    return props.transcript.find(segment => time >= segment.start && time < segment.end)
  }
  
  const handleTimeUpdate: () => void = (): void => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }
  
  const togglePlayPause: () => void = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  const resetAudio: () => void = (): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }
  
  return (
    <div>
      <header className="w-full flex justify-center items-center mt-10 mb-10">
        <h2 className="text-xl font-bold">{props.sessionInfo.title}</h2>
      </header>
      
      <section className="flex-row justify-center items-center p-3 w-[70%] mx-auto">
        {/* Transcript */}
        <div className="space-y-4 bg-white p-6 rounded-lg shadow overflow-y-scroll" style={{height: 400}}>
          {props.transcript.map((segment, index) => (
            <p
              key={index}
              className={`transition-colors ${
                currentTime >= segment.start && currentTime < segment.end
                  ? 'bg-blue-100 p-2 rounded'
                  : ''
              }`}
            >
              {segment.text}
            </p>
          ))}
        </div>
        
        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={props.audioSrc}
          onTimeUpdate={handleTimeUpdate}
          className="hidden"
        />
        {/* Audio Controls */}
        <div className="flex items-center justify-center mx-auto space-x-4 bg-gray-100 p-4 rounded-lg w-[50%] shadow mt-6">
          {/* Play / Pause */}
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? <Pause size={24}/> : <Play size={24}/>}
          </button>
          
          {/* Restart */}
          <button
            onClick={resetAudio}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={24}/>
          </button>
          
          {/* Progress bar */}
          <div className="flex-1 h-2 bg-gray-300 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{
                width: `${(currentTime / (props.transcript[props.transcript.length - 1].end))}%`
              }}
            />
          </div>
        </div>
      </section>
      
      <footer className="absolute w-full bottom-2">
        <p className="text-center">
          Copyright © Voxivers.com
        </p>
      </footer>
    </div>
  )
}
