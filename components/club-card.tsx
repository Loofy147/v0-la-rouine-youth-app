"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import type { Club } from "@/lib/types"

interface ClubCardProps {
  club: Club
  onJoin?: (clubId: string) => void
  isJoined?: boolean
}

export function ClubCard({ club, onJoin, isJoined = false }: ClubCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="h-24 bg-gradient-to-br from-primary/20 to-secondary/20" />
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3 -mt-12 mb-3">
          <Avatar className="h-16 w-16 border-4 border-card">
            <AvatarImage src={club.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {club.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <h3 className="font-bold text-base leading-tight">{club.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{club.description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{club.members} members</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {club.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button
          onClick={() => onJoin?.(club.id)}
          variant={isJoined ? "outline" : "default"}
          size="sm"
          className="w-full"
        >
          {isJoined ? "Leave" : "Join"}
        </Button>
      </CardContent>
    </Card>
  )
}
