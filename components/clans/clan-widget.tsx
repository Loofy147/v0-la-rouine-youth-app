"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Plus, Share2, Trophy } from "lucide-react"
import type { Clan, User } from "@/lib/types"

interface ClanWidgetProps {
  clan: Clan | null
  currentUser: User
  onCreateClan?: () => void
  onJoinClan?: () => void
  onInviteFriend?: () => void
}

export function ClanWidget({ clan, currentUser, onCreateClan, onJoinClan, onInviteFriend }: ClanWidgetProps) {
  if (!clan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Squad / Clan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Join or create a squad to earn points together and compete as a team
          </p>
          <div className="flex gap-2">
            <Button onClick={onCreateClan} variant="outline" size="sm" className="flex-1 bg-transparent">
              <Plus className="w-3 h-3 mr-1" />
              Create
            </Button>
            <Button onClick={onJoinClan} size="sm" className="flex-1">
              <Users className="w-3 h-3 mr-1" />
              Join
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const clanMembers = [
    {
      id: currentUser.id,
      displayName: currentUser.displayName,
      avatar: currentUser.avatar,
      points: currentUser.points,
      isLeader: false,
    },
    // Mock members
    ...[
      {
        id: "m1",
        displayName: "Jordan Lee",
        avatar: "/placeholder.svg?height=32&width=32",
        points: 1850,
        isLeader: true,
      },
      {
        id: "m2",
        displayName: "Taylor Swift",
        avatar: "/placeholder.svg?height=32&width=32",
        points: 1650,
        isLeader: false,
      },
    ],
  ]

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            {clan.name}
          </span>
          <Badge className="gap-1">
            <Trophy className="w-3 h-3" />
            {clan.totalPoints}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {clanMembers.map((member) => (
            <div key={member.id} className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{member.displayName[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">
                    {member.displayName}
                    {member.isLeader && (
                      <Badge variant="outline" className="text-xs ml-1">
                        Lead
                      </Badge>
                    )}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-primary whitespace-nowrap">{member.points}</span>
            </div>
          ))}
        </div>

        <Button onClick={onInviteFriend} variant="outline" size="sm" className="w-full gap-2 bg-transparent">
          <Share2 className="w-3 h-3" />
          Invite Friend
        </Button>

        <div className="p-2 bg-muted/50 rounded text-xs text-muted-foreground">
          <p className="font-semibold mb-1">Squad Bonus</p>
          <p>Earn 10% bonus points on all activities as a team</p>
        </div>
      </CardContent>
    </Card>
  )
}
