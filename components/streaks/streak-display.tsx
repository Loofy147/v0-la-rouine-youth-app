"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Award, Calendar } from "lucide-react"

interface StreakDisplayProps {
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
}

export function StreakDisplay({ currentStreak, longestStreak, lastActivityDate }: StreakDisplayProps) {
  const daysAgo = Math.floor((Date.now() - new Date(lastActivityDate).getTime()) / (1000 * 60 * 60 * 24))
  const isStreakActive = daysAgo <= 1

  return (
    <Card
      className={`border-2 ${
        currentStreak >= 7 ? "border-orange-400 bg-orange-50/50 dark:bg-orange-950/20" : "border-border"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Flame
              className={`w-5 h-5 ${isStreakActive ? "text-orange-500 animate-pulse" : "text-muted-foreground"}`}
            />
            Activity Streak
          </span>
          {currentStreak >= 7 && (
            <Badge className="bg-orange-500 gap-1">
              <Award className="w-3 h-3" />
              On Fire
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Current Streak</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{currentStreak}</p>
            <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">
              {currentStreak === 1 ? "day" : "days"}
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <p className="text-xs text-muted-foreground">Best Streak</p>
            <p className="text-2xl font-bold text-primary">{longestStreak}</p>
            <p className="text-xs text-primary/70 mt-1">{longestStreak === 1 ? "day" : "days"}</p>
          </div>
        </div>

        <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <div className="text-xs text-muted-foreground">
            {isStreakActive ? (
              <span className="text-green-600 dark:text-green-400 font-semibold">Active today - Keep it going!</span>
            ) : daysAgo === 1 ? (
              <span>Come back tomorrow to continue your streak</span>
            ) : (
              <span className="text-red-600 dark:text-red-400">Streak ended {daysAgo} days ago</span>
            )}
          </div>
        </div>

        {currentStreak >= 3 && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Milestone Progress</p>
            <div className="space-y-2">
              {[3, 7, 14, 30].map((milestone) => (
                <div key={milestone} className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all"
                      style={{
                        width: `${Math.min((currentStreak / milestone) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">{milestone}d</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
