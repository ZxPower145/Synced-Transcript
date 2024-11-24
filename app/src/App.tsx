import React from 'react'
import AudioPlayer from "./AudioPlayer";

export default function App(): React.JSX.Element {
  const audio = require("./assets/sample.mp3")
  const transcript = require("./assets/transcription.json")
  
  return <AudioPlayer
    sessionInfo={{
      title: "Mr. Ashley's first session"
      
      
    }}
    audioSrc={audio}
    transcript={transcript}
  />
}
