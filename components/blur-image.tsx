"use client"

import { useState } from "react"

interface BlurImageProps {
  src: string
  alt: string
  blurHash?: string
  width: number
  height: number
}

export function BlurImage({ src, alt, blurHash, width, height }: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-lg bg-muted">
      {!isLoaded && blurHash && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundColor: "#f0f0f0",
            backgroundImage: `linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0),
                              linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0)`,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        />
      )}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
