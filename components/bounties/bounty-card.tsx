"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Clock, Zap } from "lucide-react"
import type { Bounty } from "@/lib/types"

interface BountyCardProps {
  bounty: Bounty
  onClaim?: (bountyId: string) => void
  isClaimed?: boolean
}

export function BountyCard({ bounty, onClaim, isClaimed = false }: BountyCardProps) {
  const [isClaimingAnimation, setIsClaimingAnimation] = useState(false)

  const progressPercent = bounty.maxCompletions ? (bounty.completions / bounty.maxCompletions) * 100 : 100

  const daysLeft = Math.ceil((new Date(bounty.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  const handleClaim = () => {
    setIsClaimingAnimation(true)
    setTimeout(() => {
      onClaim?.(bounty.id)
      setIsClaimingAnimation(false)
    }, 1200)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="h-32 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-base leading-tight">{bounty.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{bounty.description}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded">
            <Trophy className="w-3 h-3 text-primary" />
            <span className="text-xs font-bold text-primary">{bounty.rewardPoints}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {bounty.maxCompletions && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Completions</span>
              <span className="font-semibold">
                {bounty.completions} / {bounty.maxCompletions}
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{daysLeft > 0 ? `${daysLeft}d left` : "Expired"}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{Math.floor(Math.random() * 50) + 10} active</span>
          </div>
        </div>

        <Button
          onClick={handleClaim}
          disabled={isClaimed || daysLeft <= 0}
          className={`w-full transition-all ${isClaimingAnimation ? "scale-95 opacity-50" : ""}`}
          size="sm"
        >
          {isClaimed ? (
            <>
              <Zap className="w-3 h-3 mr-1" />
              Claimed
            </>
          ) : (
            "Claim Bounty"
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
