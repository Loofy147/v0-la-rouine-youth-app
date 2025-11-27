"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Shield } from "lucide-react"

interface TrustScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function TrustScoreBadge({ score, size = "md" }: TrustScoreBadgeProps) {
  const getTrustLevel = (s: number) => {
    if (s < 40) return { label: "New User", color: "bg-gray-500" }
    if (s < 70) return { label: "Trusted", color: "bg-blue-500" }
    return { label: "Verified", color: "bg-green-500" }
  }

  const level = getTrustLevel(score)

  const sizeClass = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  }[size]

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }[size]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${level.color} gap-1 cursor-help ${sizeClass}`}>
            <Shield className={iconSize} />
            {level.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs space-y-1">
            <p className="font-semibold">Trust Score: {score}/100</p>
            <p className="text-muted-foreground">
              {score >= 70
                ? "Phone verified & active community member"
                : score >= 40
                  ? "Participated in community events"
                  : "New member - verify phone to build trust"}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
