"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle } from "lucide-react"

interface GeofenceChallengeProps {
  challengeId: string
  targetLat: number
  targetLng: number
  radiusMeters: number
  title: string
  reward: number
}

export function GeofenceChallenge({
  challengeId,
  targetLat,
  targetLng,
  radiusMeters,
  title,
  reward,
}: GeofenceChallengeProps) {
  const [isNearby, setIsNearby] = useState(false)
  const [distance, setDistance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("[v0] Geolocation not supported")
      setLoading(false)
      return
    }

    navigator.geolocation.watchPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude

        const R = 6371e3
        const φ1 = (targetLat * Math.PI) / 180
        const φ2 = (userLat * Math.PI) / 180
        const Δφ = ((userLat - targetLat) * Math.PI) / 180
        const Δλ = ((userLng - targetLng) * Math.PI) / 180

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const dist = R * c

        setDistance(Math.round(dist))
        setIsNearby(dist < radiusMeters)
        setLoading(false)
      },
      (error) => {
        console.error("[v0] Geolocation error:", error)
        setLoading(false)
      },
    )
  }, [targetLat, targetLng, radiusMeters])

  return (
    <Card className={`border-2 ${isNearby ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-border"}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {title}
          </span>
          {isNearby && <Badge className="bg-green-500">Verified Location</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground">
          {loading ? (
            "Detecting location..."
          ) : distance !== null ? (
            <>
              {isNearby ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  You are at the location ({distance}m away)
                </div>
              ) : (
                <div>
                  {distance}m away from challenge location
                  <br />
                  Get within {radiusMeters}m to verify
                </div>
              )}
            </>
          ) : (
            "Unable to detect location"
          )}
        </div>
        <Button disabled={!isNearby} className="w-full">
          {isNearby ? "Submit Proof" : "Get Closer"}
        </Button>
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Reward</span>
          <span className="font-bold text-primary">{reward} points</span>
        </div>
      </CardContent>
    </Card>
  )
}
