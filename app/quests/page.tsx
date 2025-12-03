"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { PostCard } from "@/components/post-card"
import { ClubCard } from "@/components/club-card"
import { LeaderboardCard } from "@/components/leaderboard-card"
import { HeatMap } from "@/components/heat-map"
import { QuestCard } from "@/components/quests/QuestCard"
import { AchievementCard } from "@/components/quests/AchievementCard"
import { useGamification } from "@/lib/gamification-context"

import { Plus, Trophy, Users, Star, Bell, Settings, Flame, MapPin } from "lucide-react"

import type { User, Post, Club, LeaderboardEntry, Quest, UserQuest, Achievement, UserAchievement } from "@/lib/types"

export default function LaRouineEnhanced() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("feed")
  const [posts, setPosts] = useState<Post[]>([])
  const [clubs, setClubs] = useState<Club[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const { quests, userQuests, achievements, userAchievements } = useGamification()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createType, setCreateType] = useState<"post" | "event" | "challenge">("post")
  const [feedFilter, setFeedFilter] = useState<"all" | "events" | "challenges">("all")

  useEffect(() => {
    const mockUser: User = {
      id: "1",
      username: "alex_creative",
      displayName: "Alex Martinez",
      avatar: "/placeholder.svg?height=100&width=100",
      phone: undefined,
      bio: "Creative explorer & community builder",
      points: 2450,
      badges: [],
      cityZone: "Downtown",
      trustScore: 78,
      level: 5,
      streakDays: 12,
      lastActivityDate: new Date(),
      referralCode: "ALEX123",
      clans: ["creative-collective"],
      createdAt: new Date(),
    }

    setCurrentUser(mockUser)

    const mockPosts: Post[] = [
      {
        id: "1",
        type: "challenge",
        authorId: "2",
        title: "📸 Creative Street Photography Challenge",
        body: "Capture the hidden beauty of our city! Winner gets 150 points + Featured Badge!",
        mediaUrl: "/placeholder.svg?height=300&width=600",
        clubId: undefined,
        meta: {
          rewardPoints: 150,
          submissionsCount: 47,
          likes: 124,
          comments: 38,
          isLiked: false,
        },
        likes: 124,
        comments: 38,
        createdAt: new Date(Date.now() - 3600000),
      },
      {
        id: "2",
        type: "event",
        authorId: "3",
        title: "🎨 Street Art Workshop - Downtown",
        body: "Join us for a hands-on street art session. All materials provided!",
        mediaUrl: undefined,
        clubId: undefined,
        meta: {
          startsAt: new Date(Date.now() + 86400000),
          location: "Downtown Square, City Center",
          capacity: 30,
          attendeesCount: 15,
        },
        likes: 89,
        comments: 22,
        createdAt: new Date(Date.now() - 7200000),
      },
    ]

    setPosts(mockPosts)

    const mockClubs: Club[] = [
      {
        id: "1",
        name: "Arts & Culture",
        slug: "arts-culture",
        description: "Celebrate local art, music, and creative expression",
        ownerId: "5",
        privacy: "public",
        tags: ["art", "culture", "events"],
        avatar: "/placeholder.svg?height=100&width=100",
        members: 234,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Sports & Fitness",
        slug: "sports-fitness",
        description: "Join outdoor activities and fitness challenges",
        ownerId: "6",
        privacy: "public",
        tags: ["sports", "fitness", "health"],
        avatar: "/placeholder.svg?height=100&width=100",
        members: 456,
        createdAt: new Date(),
      },
    ]

    setClubs(mockClubs)

    const mockLeaderboard: LeaderboardEntry[] = [
      {
        rank: 1,
        points: 4230,
        period: "monthly",
        user: {
          id: "4",
          username: "sarah_events",
          displayName: "Sarah Johnson",
          avatar: "/placeholder.svg?height=50&width=50",
          points: 4230,
          badges: [],
          cityZone: "University District",
          trustScore: 95,
          level: 8,
          streakDays: 28,
          lastActivityDate: new Date(),
          referralCode: "SARAH456",
          clans: [],
          createdAt: new Date(),
        },
      },
      {
        rank: 2,
        points: 3890,
        period: "monthly",
        user: {
          id: "5",
          username: "mike_artist",
          displayName: "Michael Chen",
          avatar: "/placeholder.svg?height=50&width=50",
          points: 3890,
          badges: [],
          cityZone: "Arts Quarter",
          trustScore: 88,
          level: 7,
          streakDays: 15,
          lastActivityDate: new Date(),
          referralCode: "MIKE789",
          clans: [],
          createdAt: new Date(),
        },
      },
    ]

    setLeaderboard(mockLeaderboard)
  }, [])

  const handleLike = async (postId: string) => {
    console.log("[v0] Optimistic like for post:", postId)
  }

  const handleJoinClub = (clubId: string) => {
    setClubs(clubs.map((c) => (c.id === clubId ? { ...c, members: c.members + (c.id === clubId ? 1 : 0) } : c)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-lg">La-Rouine</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="feed" className="gap-2">
              <Flame className="w-4 h-4" />
              <span className="hidden sm:inline">Feed</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger value="clubs" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Clubs</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </TabsTrigger>
            <TabsTrigger value="quests" className="gap-2">
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Quests</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{currentUser?.displayName?.[0]}</AvatarFallback>
              </Avatar>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} currentUser={currentUser || undefined} onLike={handleLike} />
            ))}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Local Rouine Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <HeatMap
                  events={[
                    {
                      lat: 36.7372,
                      lng: 3.0869,
                      intensity: 0.8,
                      title: "Street Art Workshop",
                    },
                    {
                      lat: 36.7376,
                      lng: 3.0874,
                      intensity: 0.6,
                      title: "Community Cleanup",
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clubs" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {clubs.map((club) => (
                <ClubCard key={club.id} club={club} onJoin={handleJoinClub} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            {leaderboard.map((entry) => (
              <LeaderboardCard key={entry.user.id} entry={entry} highlight={currentUser?.id === entry.user.id} />
            ))}
          </TabsContent>

          <TabsContent value="quests" className="space-y-4">
            <h2 className="text-xl font-bold">Active Quests</h2>
            {quests.map(quest => (
              <QuestCard key={quest.id} quest={quest} userQuest={userQuests.find(uq => uq.questId === quest.id)} />
            ))}
            <h2 className="text-xl font-bold mt-8">Achievements</h2>
            {achievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} userAchievement={userAchievements.find(ua => ua.achievementId === achievement.id)} />
            ))}
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            {currentUser && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-end gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-2xl font-bold">{currentUser.displayName}</h2>
                          <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
                        </div>
                      </div>
                      <Badge className="gap-1">
                        <Star className="w-3 h-3" />
                        Lvl {currentUser.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{currentUser.points}</p>
                        <p className="text-xs text-muted-foreground">Points</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-secondary flex items-center justify-center gap-1">
                          <Flame className="w-5 h-5" />
                          {currentUser.streakDays}
                        </p>
                        <p className="text-xs text-muted-foreground">Day Streak</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">{currentUser.trustScore}</p>
                        <p className="text-xs text-muted-foreground">Trust Score</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-2">Level Progress</p>
                      <Progress value={(currentUser.points % 500) / 5} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {500 - (currentUser.points % 500)} points to Level {currentUser.level + 1}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-3">Your Clan</p>
                      <Badge className="gap-2">
                        <Users className="w-3 h-3" />
                        {currentUser.clans[0] || "Solo"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Create FAB */}
      <Button
        onClick={() => setShowCreateModal(true)}
        size="lg"
        className="fixed bottom-24 right-4 rounded-full shadow-lg"
      >
        <Plus className="w-5 h-5" />
      </Button>

      {/* Create Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Type</Label>
              <div className="flex gap-2 mt-2">
                {(["post", "event", "challenge"] as const).map((type) => (
                  <Button
                    key={type}
                    variant={createType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCreateType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label>Title</Label>
              <Input placeholder="Give it a catchy title" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Tell your story..." />
            </div>
            <Button className="w-full">Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
