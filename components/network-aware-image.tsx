"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getNetworkStatus, getImageQuality, getOptimalImageSize } from "@/lib/network-utils"

interface NetworkAwareImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
}

export function NetworkAwareImage({ src, alt, width = 400, height = 400, priority = false }: NetworkAwareImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [quality, setQuality] = useState<"low" | "medium" | "high">("high")
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const quality = getImageQuality()
    setQuality(quality)

    const status = getNetworkStatus()
    console.log(`[v0] Network status:`, {
      online: status.isOnline,
      type: status.effectiveType,
      quality,
    })
  }, [])

  const handleError = () => {
    if (retryCount < 2) {
      setRetryCount(retryCount + 1)
      console.warn(`[v0] Image load failed, retrying (${retryCount + 1}/2)...`)

      setTimeout(
        () => {
          const img = new Image()
          img.src = src
        },
        1000 * (retryCount + 1),
      )
    }
  }

  const optimalSize = getOptimalImageSize(quality)

  return (
    <div className="relative overflow-hidden rounded-lg bg-muted">
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: "linear-gradient(135deg, #FFB3A0 0%, #FF8555 50%, #FF6B35 100%)",
            opacity: 0.5,
          }}
        />
      )}

      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={optimalSize.width}
        height={optimalSize.height}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}
