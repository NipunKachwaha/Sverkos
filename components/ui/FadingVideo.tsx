'use client'

import { useRef, useEffect, useState } from 'react'

export default function FadingVideo({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onLoadedData = () => {
      setIsLoaded(true)
    }

    video.addEventListener('loadeddata', onLoadedData)

    if (video.readyState >= 2) {
      onLoadedData()
    }

    return () => {
      video.removeEventListener('loadeddata', onLoadedData)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop 
      muted
      playsInline
      preload="metadata"
      className={className}
      style={{ 
        ...style, 
        opacity: isLoaded ? 1 : 0, 
        transition: 'opacity 500ms ease-out', 
        willChange: 'opacity'
      }}
    />
  )
}