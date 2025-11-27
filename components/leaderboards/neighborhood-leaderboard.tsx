"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Medal, MapPin, TrendingUp } from "lucide-react"
import type { LeaderboardEntry } from "@/lib/types"

interface NeighborhoodLeaderboardProps {
  currentZone: string
  entries: LeaderboardEntry[]
  userRank: number
}

export function NeighborhoodLeaderboard({ currentZone, entries, userRank }: NeighborhoodLeaderboardProps) {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly")

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return null
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-primary" />
            {currentZone} Rankings
          </span>
          <Badge variant="outline" className="gap-1">
            <MapPin className="w-3 h-3" />
            Local
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs value={period} onValueChange={(v) => setPeriod(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-2">
          {entries.slice(0, 10).map((entry, idx) => (
            <div
              key={entry.user.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                idx < 3
                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20"
                  : "bg-muted/30 hover:bg-muted/50"
              }`}
            >
              <div className="w-6 text-center font-bold text-lg">{getMedalIcon(entry.rank) || `#${entry.rank}`}</div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={entry.user?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{entry.user?.displayName?.[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{entry.user?.displayName}</p>
                <p className="text-xs text-muted-foreground">Level {entry.user?.level || 1}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-primary">{entry.points}</p>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />+{Math.floor(entry.points * 0.1)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current user position if not in top 10 */}
        {userRank > 10 && (
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Your Ranking</p>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="w-6 text-center font-bold">#{userRank}</div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Your Position</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100) + 50} pts away</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
