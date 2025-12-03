"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import * as Icons from "lucide-react"
import type { Achievement, UserAchievement } from "@/lib/types"

interface AchievementCardProps {
  achievement: Achievement
  userAchievement?: UserAchievement
}

export function AchievementCard({ achievement, userAchievement }: AchievementCardProps) {
  const isUnlocked = !!userAchievement;
  const Icon = Icons[achievement.icon as keyof typeof Icons] || Icons.Award;

  return (
    <Card className={`transition-all ${isUnlocked ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-card'}`}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${isUnlocked ? 'bg-green-100 dark:bg-green-900' : 'bg-muted'}`}>
            <Icon className={`w-6 h-6 ${isUnlocked ? 'text-green-500' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <CardTitle className="text-base">{achievement.title}</CardTitle>
            <CardDescription className="text-xs mt-1">{achievement.description}</CardDescription>
          </div>
          {isUnlocked && (
            <Badge variant="default" className="ml-auto bg-green-500">Unlocked</Badge>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}
