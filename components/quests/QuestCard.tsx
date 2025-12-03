"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import type { Quest, UserQuest } from "@/lib/types"
import { Gift } from "lucide-react"

interface QuestCardProps {
  quest: Quest
  userQuest?: UserQuest
}

export function QuestCard({ quest, userQuest }: QuestCardProps) {
  const getOverallProgress = () => {
    if (!userQuest) return 0;

    const totalCriteria = quest.criteria.length;
    if (totalCriteria === 0) return 100;

    const completedCriteria = quest.criteria.filter(criterion => {
      const progress = userQuest.progress.find(p => p.eventType === criterion.eventType);
      return progress && progress.currentCount >= criterion.targetCount;
    }).length;

    return (completedCriteria / totalCriteria) * 100;
  };

  const progress = getOverallProgress();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg">{quest.title}</CardTitle>
                <CardDescription className="text-sm mt-1">{quest.description}</CardDescription>
            </div>
            {userQuest?.status === 'completed' && (
              <Button variant="ghost" size="sm" className="text-green-500">Completed</Button>
            )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          {quest.criteria.map((criterion, index) => {
            const progress = userQuest?.progress.find(p => p.eventType === criterion.eventType);
            const currentCount = progress?.currentCount || 0;
            const progressPercentage = (currentCount / criterion.targetCount) * 100;
            return (
              <div key={index} className="mb-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{criterion.description}</span>
                  <span>{currentCount} / {criterion.targetCount}</span>
                </div>
                <Progress value={progressPercentage} />
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Gift className="w-4 h-4" />
            <span>{quest.reward.points} Points</span>
            {quest.reward.badgeId && <span>+ Badge</span>}
          </div>
          {userQuest?.status !== 'completed' && (
            <Button variant="outline" size="sm">View Details</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
