"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, Zap } from "lucide-react"
import type { LeaderboardEntry } from "@/lib/types"

interface LeaderboardCardProps {
  entry: LeaderboardEntry
  highlight?: boolean
}

export function LeaderboardCard({ entry, highlight = false }: LeaderboardCardProps) {
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-orange-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-green-500" />
    if (trend === "down") return <TrendingUp className="w-3 h-3 rotate-180 text-red-500" />
    return <Zap className="w-3 h-3 text-yellow-500" />
  }

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
        highlight ? "bg-primary/10 border-2 border-primary" : "bg-muted/30 hover:bg-muted/50"
      }`}
    >
      <div className={`w-8 text-center font-bold text-lg ${getMedalColor(entry.rank)}`}>#{entry.rank}</div>
      <Avatar className="h-12 w-12">
        <AvatarImage src={entry.user?.avatar || "/placeholder.svg"} />
        <AvatarFallback>{entry.user?.displayName?.[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{entry.user?.displayName}</p>
          <Badge variant="outline" className="text-xs">
            Lvl {entry.user?.level || 1}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{entry.user?.cityZone}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-xl text-primary">{entry.points.toLocaleString()}</p>
        <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
          {getTrendIcon(entry.user?.level?.toString() || "same")}
          <span>+{(entry.points * 0.15).toFixed(0)}</span>
        </div>
      </div>
    </div>
  )
}
