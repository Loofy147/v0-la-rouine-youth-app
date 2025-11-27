"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Users, Copy, Check, Share2, Zap } from "lucide-react"

interface ReferralStats {
  referralCode: string
  referralsCount: number
  totalReward: number
  clanSize: number
  activeClan: string | null
}

interface ReferralStats {
  referralCode: string
  referralsCount: number
  totalReward: number
  clanSize: number
  activeClan: string | null
}

export function ReferralProgram({ stats }: { stats: ReferralStats }) {
  const [copied, setCopied] = useState(false)
  const [clanName, setClanName] = useState("")
  const [showClanForm, setShowClanForm] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`la-rouine.app/join/${stats.referralCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    console.log("[v0] Referral code copied")
  }

  const mockReferrals = [
    { id: "1", name: "Jordan Lee", avatar: "/placeholder.svg?height=32&width=32", status: "active" },
    { id: "2", name: "Taylor Swift", avatar: "/placeholder.svg?height=32&width=32", status: "active" },
    { id: "3", name: "Casey Brown", avatar: "/placeholder.svg?height=32&width=32", status: "pending" },
  ]

  return (
    <div className="space-y-6">
      {/* Referral Code Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            Invite Friends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg space-y-3">
            <p className="text-sm font-semibold">Your Referral Link</p>
            <div className="flex gap-2">
              <Input value={`la-rouine.app/join/${stats.referralCode}`} readOnly className="font-mono text-xs" />
              <Button onClick={handleCopyCode} variant="outline" size="sm" className="flex-shrink-0 bg-transparent">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Each friend you invite earns you 200 points + bonus clan multiplier
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-muted/30 rounded">
              <p className="text-2xl font-bold text-primary">{stats.referralsCount}</p>
              <p className="text-xs text-muted-foreground">Referrals</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded">
              <p className="text-2xl font-bold text-secondary">{stats.totalReward}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded">
              <p className="text-2xl font-bold text-accent">{stats.clanSize}</p>
              <p className="text-xs text-muted-foreground">Clan</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clan/Squad Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Squad: {stats.activeClan || "Alone"}
            </span>
            {!stats.activeClan && (
              <Button onClick={() => setShowClanForm(true)} size="sm" variant="outline">
                Create
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        {stats.activeClan && (
          <CardContent className="space-y-4">
            <div className="p-3 bg-primary/5 rounded border border-primary/20">
              <p className="text-sm font-semibold mb-2">Squad Bonus</p>
              <p className="text-xs text-muted-foreground">All squad members earn 10% bonus points on all activities</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold">Squad Members</p>
              {mockReferrals.map((ref) => (
                <div key={ref.id} className="flex items-center gap-3 p-2 rounded bg-muted/30">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={ref.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{ref.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{ref.name}</p>
                  </div>
                  <Badge variant={ref.status === "active" ? "secondary" : "outline"} className="text-xs flex-shrink-0">
                    {ref.status === "active" ? "Active" : "Invited"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Top Referrers This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((rank) => (
              <div key={rank} className="flex items-center gap-3 p-3 rounded bg-muted/30">
                <span className="font-bold text-lg w-6 text-primary">#{rank}</span>
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {["Sarah Event Master", "Mike Artist", "Lisa Organizer"][rank - 1]}
                  </p>
                  <p className="text-xs text-muted-foreground">{[12, 10, 8][rank - 1]} referrals</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{[2400, 2000, 1600][rank - 1]}</p>
                  <p className="text-xs text-muted-foreground">pts</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
