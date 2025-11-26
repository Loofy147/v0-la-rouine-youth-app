"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Plus,
  Users,
  Calendar,
  Target,
  Star,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Clock,
  Upload,
  Award,
  TrendingUp,
  Filter,
  Search,
  Bell,
  Settings,
  Home,
  Flame,
  Check,
  Send,
  ImageIcon,
  Video,
  Crown,
  Medal,
  Zap,
} from "lucide-react"

interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  points: number
  badges: string[]
  cityZone: string
  level: number
}

interface Post {
  id: string
  type: "post" | "event" | "challenge"
  author: User
  title: string
  body: string
  media?: string
  likes: number
  comments: number
  shares: number
  createdAt: Date
  club?: Club
  meta?: any
  isLiked?: boolean
}

interface Club {
  id: string
  name: string
  slug: string
  description: string
  members: number
  tags: string[]
  avatar: string
  isJoined?: boolean
  category: string
}

interface LeaderboardUser extends User {
  rank: number
  weeklyPoints: number
  trend: "up" | "down" | "same"
}

export default function LaRouine() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("feed")
  const [posts, setPosts] = useState<Post[]>([])
  const [clubs, setClubs] = useState<Club[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createType, setCreateType] = useState<"post" | "event" | "challenge">("post")
  const [feedFilter, setFeedFilter] = useState<"all" | "events" | "challenges">("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setCurrentUser({
      id: "1",
      username: "alex_creative",
      displayName: "Alex Martinez",
      avatar: "/placeholder.svg?height=100&width=100",
      points: 2450,
      badges: ["early-adopter", "challenge-master", "social-butterfly"],
      cityZone: "Downtown",
      level: 5,
    })

    setPosts([
      {
        id: "1",
        type: "challenge",
        author: {
          id: "2",
          username: "sarah_events",
          displayName: "Sarah Johnson",
          avatar: "/placeholder.svg?height=50&width=50",
          points: 3890,
          badges: ["organizer", "top-creator"],
          cityZone: "University District",
          level: 7,
        },
        title: "📸 Creative Street Photography Challenge",
        body: "Capture the hidden beauty of our city! Take a creative photo of any landmark. Winner gets 150 points + Featured Badge!",
        media: "/placeholder.svg?height=300&width=600",
        likes: 124,
        comments: 38,
        shares: 22,
        createdAt: new Date(Date.now() - 3600000),
        isLiked: false,
        meta: {
          rewardPoints: 150,
          submissionsCount: 47,
          expiresAt: new Date(Date.now() + 86400000 * 5),
          difficulty: "medium",
        },
      },
      {
        id: "2",
        type: "event",
        author: {
          id: "3",
          username: "mike_artist",
          displayName: "Michael Chen",
          avatar: "/placeholder.svg?height=50&width=50",
          points: 2650,
          badges: ["artist", "community-hero"],
          cityZone: "Arts Quarter",
          level: 6,
        },
        title: "🎨 Coffee & Canvas: Evening Art Session",
        body: "Join us at Riverside Café for an evening of art, music, and great conversations. Bring your sketchbook or just come hang out!",
        media: "/placeholder.svg?height=300&width=600",
        likes: 156,
        comments: 62,
        shares: 41,
        createdAt: new Date(Date.now() - 7200000),
        isLiked: true,
        meta: {
          startsAt: new Date(Date.now() + 86400000 * 2),
          location: "Riverside Café - University Ave",
          capacity: 40,
          attendeesCount: 28,
          price: "free",
        },
      },
      {
        id: "3",
        type: "post",
        author: {
          id: "4",
          username: "emma_leader",
          displayName: "Emma Williams",
          avatar: "/placeholder.svg?height=50&width=50",
          points: 4200,
          badges: ["community-hero", "early-adopter", "top-contributor"],
          cityZone: "Youth Hub",
          level: 9,
        },
        title: "🌟 Amazing Ideas from Last Week's Meetup!",
        body: "Huge thanks to everyone who showed up! We came up with incredible projects to improve our community. Can't wait for the next one!",
        media: "/placeholder.svg?height=300&width=600",
        likes: 203,
        comments: 85,
        shares: 34,
        createdAt: new Date(Date.now() - 14400000),
        isLiked: true,
      },
      {
        id: "4",
        type: "challenge",
        author: {
          id: "5",
          username: "david_fitness",
          displayName: "David Rodriguez",
          avatar: "/placeholder.svg?height=50&width=50",
          points: 3100,
          badges: ["fitness-guru", "challenge-master"],
          cityZone: "Sports Center",
          level: 7,
        },
        title: "🏃‍♂️ 30-Day Morning Run Challenge",
        body: "Commit to a 20-minute morning run every day for 30 days. Share your progress photos and earn 200 points!",
        media: "/placeholder.svg?height=300&width=600",
        likes: 98,
        comments: 31,
        shares: 18,
        createdAt: new Date(Date.now() - 21600000),
        isLiked: false,
        meta: {
          rewardPoints: 200,
          submissionsCount: 34,
          expiresAt: new Date(Date.now() + 86400000 * 30),
          difficulty: "hard",
        },
      },
      {
        id: "5",
        type: "event",
        author: {
          id: "6",
          username: "lisa_music",
          displayName: "Lisa Park",
          avatar: "/placeholder.svg?height=50&width=50",
          points: 2890,
          badges: ["musician", "organizer"],
          cityZone: "Downtown",
          level: 6,
        },
        title: "🎵 Open Mic Night - All Welcome!",
        body: "Showcase your talent or just enjoy the show! Musicians, poets, comedians - everyone is welcome. Sign up at the door.",
        media: "/placeholder.svg?height=300&width=600",
        likes: 142,
        comments: 45,
        shares: 29,
        createdAt: new Date(Date.now() - 28800000),
        isLiked: false,
        meta: {
          startsAt: new Date(Date.now() + 86400000 * 4),
          location: "The Underground - Main St",
          capacity: 60,
          attendeesCount: 42,
          price: "free",
        },
      },
    ])

    setClubs([
      {
        id: "1",
        name: "Street Photography",
        slug: "street-photography",
        description: "Capturing urban life through the lens. Weekly photo walks and critiques.",
        members: 342,
        tags: ["Photography", "Art", "Urban"],
        avatar: "/placeholder.svg?height=80&width=80",
        isJoined: true,
        category: "Arts & Culture",
      },
      {
        id: "2",
        name: "Active Runners",
        slug: "active-runners",
        description: "Morning runs, marathons, and fitness challenges for all levels.",
        members: 528,
        tags: ["Fitness", "Running", "Health"],
        avatar: "/placeholder.svg?height=80&width=80",
        isJoined: true,
        category: "Sports & Fitness",
      },
      {
        id: "3",
        name: "Local Musicians",
        slug: "local-musicians",
        description: "Connect with fellow musicians, jam sessions, and open mics.",
        members: 267,
        tags: ["Music", "Performance", "Creative"],
        avatar: "/placeholder.svg?height=80&width=80",
        isJoined: false,
        category: "Arts & Culture",
      },
      {
        id: "4",
        name: "Book Club",
        slug: "book-club",
        description: "Monthly book discussions, author talks, and literary events.",
        members: 189,
        tags: ["Reading", "Literature", "Discussion"],
        avatar: "/placeholder.svg?height=80&width=80",
        isJoined: false,
        category: "Education",
      },
      {
        id: "5",
        name: "Startup Founders",
        slug: "startup-founders",
        description: "Entrepreneurs building the next big thing. Networking and mentorship.",
        members: 412,
        tags: ["Business", "Tech", "Networking"],
        avatar: "/placeholder.svg?height=80&width=80",
        isJoined: true,
        category: "Business",
      },
      {
        id: "6",
        name: "Gaming League",
        slug: "gaming-league",
        description: "Competitive and casual gaming tournaments. All platforms welcome.",
        members: 631,
        tags: ["Gaming", "Esports", "Competition"],
        avatar: "/placeholder.svg?height=80&width=80",
        isJoined: false,
        category: "Entertainment",
      },
    ])

    setLeaderboard([
      {
        id: "4",
        username: "emma_leader",
        displayName: "Emma Williams",
        avatar: "/placeholder.svg?height=50&width=50",
        points: 4200,
        badges: ["community-hero", "early-adopter"],
        cityZone: "Youth Hub",
        level: 9,
        rank: 1,
        weeklyPoints: 680,
        trend: "up",
      },
      {
        id: "2",
        username: "sarah_events",
        displayName: "Sarah Johnson",
        avatar: "/placeholder.svg?height=50&width=50",
        points: 3890,
        badges: ["organizer"],
        cityZone: "University District",
        level: 7,
        rank: 2,
        weeklyPoints: 520,
        trend: "up",
      },
      {
        id: "5",
        username: "david_fitness",
        displayName: "David Rodriguez",
        avatar: "/placeholder.svg?height=50&width=50",
        points: 3100,
        badges: ["fitness-guru"],
        cityZone: "Sports Center",
        level: 7,
        rank: 3,
        weeklyPoints: 445,
        trend: "down",
      },
      {
        id: "6",
        username: "lisa_music",
        displayName: "Lisa Park",
        avatar: "/placeholder.svg?height=50&width=50",
        points: 2890,
        badges: ["musician"],
        cityZone: "Downtown",
        level: 6,
        rank: 4,
        weeklyPoints: 390,
        trend: "same",
      },
      {
        id: "3",
        username: "mike_artist",
        displayName: "Michael Chen",
        avatar: "/placeholder.svg?height=50&width=50",
        points: 2650,
        badges: ["artist"],
        cityZone: "Arts Quarter",
        level: 6,
        rank: 5,
        weeklyPoints: 355,
        trend: "up",
      },
      {
        id: "1",
        username: "alex_creative",
        displayName: "Alex Martinez",
        avatar: "/placeholder.svg?height=50&width=50",
        points: 2450,
        badges: ["early-adopter"],
        cityZone: "Downtown",
        level: 5,
        rank: 6,
        weeklyPoints: 310,
        trend: "up",
      },
    ])
  }, [])

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
              isLiked: !p.isLiked,
            }
          : p,
      ),
    )
  }

  const handleJoinClub = (clubId: string) => {
    setClubs(
      clubs.map((c) =>
        c.id === clubId
          ? {
              ...c,
              members: c.isJoined ? c.members - 1 : c.members + 1,
              isJoined: !c.isJoined,
            }
          : c,
      ),
    )
  }

  const handleRSVP = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId && p.meta?.attendeesCount !== undefined) {
          return {
            ...p,
            meta: {
              ...p.meta,
              attendeesCount: p.meta.attendeesCount + 1,
            },
          }
        }
        return p
      }),
    )
  }

  const filteredPosts = posts.filter((post) => {
    if (feedFilter === "events") return post.type === "event"
    if (feedFilter === "challenges") return post.type === "challenge"
    return true
  })

  const renderFeed = () => (
    <div className="space-y-6">
      {/* Feed filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Button
                variant={feedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedFilter("all")}
                className="gap-2"
              >
                <Home className="w-4 h-4" />
                All Posts
              </Button>
              <Button
                variant={feedFilter === "events" ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedFilter("events")}
                className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                Events
              </Button>
              <Button
                variant={feedFilter === "challenges" ? "default" : "outline"}
                size="sm"
                onClick={() => setFeedFilter("challenges")}
                className="gap-2"
              >
                <Target className="w-4 h-4" />
                Challenges
              </Button>
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {filteredPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary">{post.author.displayName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{post.author.displayName}</p>
                    <Badge variant="outline" className="text-xs">
                      Lvl {post.author.level}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>@{post.author.username}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Badge
                variant={post.type === "challenge" ? "default" : post.type === "event" ? "secondary" : "outline"}
                className="gap-1"
              >
                {post.type === "challenge" ? (
                  <>
                    <Target className="w-3 h-3" />
                    Challenge
                  </>
                ) : post.type === "event" ? (
                  <>
                    <Calendar className="w-3 h-3" />
                    Event
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-3 h-3" />
                    Post
                  </>
                )}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Post content */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-balance">{post.title}</h3>
              <p className="text-sm text-foreground/80 text-pretty leading-relaxed">{post.body}</p>
            </div>

            {/* Media */}
            {post.media && (
              <div className="rounded-xl overflow-hidden bg-muted">
                <img
                  src={post.media || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full object-cover max-h-[400px]"
                />
              </div>
            )}

            {/* Challenge metadata */}
            {post.type === "challenge" && post.meta && (
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 space-y-3 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-primary">{post.meta.rewardPoints} Points</p>
                      <p className="text-xs text-muted-foreground">Reward for completing</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Flame className="w-3 h-3" />
                    {post.meta.difficulty || "Medium"}
                  </Badge>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{post.meta.submissionsCount} submissions</span>
                    <span className="font-semibold">
                      {Math.ceil((new Date(post.meta.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                      left
                    </span>
                  </div>
                  <Progress value={(post.meta.submissionsCount / 100) * 100} className="h-2 bg-primary/20" />
                </div>

                <Button className="w-full gap-2" size="sm">
                  <Upload className="w-4 h-4" />
                  Submit Entry
                </Button>
              </div>
            )}

            {/* Event metadata */}
            {post.type === "event" && post.meta && (
              <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-xl p-4 space-y-3 border border-secondary/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-secondary/20 p-2 rounded-lg">
                      <Clock className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {new Date(post.meta.startsAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.meta.startsAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-secondary/20 p-2 rounded-lg">
                      <MapPin className="w-4 h-4 text-secondary" />
                    </div>
                    <p className="text-sm">{post.meta.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-secondary/20">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{post.meta.attendeesCount}</span> /{" "}
                      <span className="text-muted-foreground">{post.meta.capacity}</span>
                    </span>
                  </div>
                  <Button size="sm" className="gap-2" onClick={() => handleRSVP(post.id)}>
                    <Check className="w-4 h-4" />
                    RSVP
                  </Button>
                </div>
              </div>
            )}

            {/* Interaction buttons */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-2">
                <Button
                  variant={post.isLiked ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                  <span className="font-semibold">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-semibold">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  <span className="font-semibold">{post.shares}</span>
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderClubs = () => (
    <div className="space-y-6">
      {/* Search and filter */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search clubs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* My Clubs */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          My Clubs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubs
            .filter((club) => club.isJoined)
            .map((club) => (
              <Card key={club.id} className="hover:shadow-lg transition-all border-0 shadow-md overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                      <AvatarImage src={club.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">{club.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-1">{club.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {club.category}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant={club.isJoined ? "secondary" : "default"}
                          onClick={() => handleJoinClub(club.id)}
                        >
                          {club.isJoined ? "Joined" : "Join"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4 text-pretty leading-relaxed">
                    {club.description}
                  </CardDescription>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="font-semibold">{club.members.toLocaleString()}</span> members
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {club.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Discover More */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-secondary" />
          Discover More
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubs
            .filter((club) => !club.isJoined)
            .map((club) => (
              <Card key={club.id} className="hover:shadow-lg transition-all border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={club.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-secondary/10 text-secondary text-lg">{club.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base mb-1">{club.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {club.category}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant={club.isJoined ? "secondary" : "default"}
                          onClick={() => handleJoinClub(club.id)}
                        >
                          {club.isJoined ? "Joined" : "Join"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-3 text-pretty">{club.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{club.members.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {club.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )

  const renderLeaderboard = () => (
    <div className="space-y-6">
      {/* Leaderboard header */}
      <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            Monthly Leaderboard
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">Top contributors in the community</CardDescription>
        </CardHeader>
      </Card>

      {/* Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((user, index) => (
          <Card
            key={user.id}
            className={`border-0 shadow-lg hover:shadow-xl transition-all ${
              index === 0
                ? "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 ring-2 ring-amber-400"
                : index === 1
                  ? "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950/20 dark:to-slate-900/20 ring-2 ring-slate-400"
                  : "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 ring-2 ring-orange-400"
            }`}
          >
            <CardHeader>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-black">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{user.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${
                      index === 0
                        ? "bg-amber-400 text-amber-950"
                        : index === 1
                          ? "bg-slate-300 text-slate-800"
                          : "bg-orange-400 text-orange-950"
                    }`}
                  >
                    {index === 0 ? <Crown className="w-6 h-6" /> : index + 1}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg">{user.displayName}</p>
                  <p className="text-sm text-muted-foreground">{user.cityZone}</p>
                </div>
                <div className="text-center">
                  <p
                    className={`text-3xl font-bold ${
                      index === 0
                        ? "text-amber-600 dark:text-amber-400"
                        : index === 1
                          ? "text-slate-600 dark:text-slate-400"
                          : "text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {user.points.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-xs gap-1">
                    <TrendingUp className="w-3 h-3" />+{user.weeklyPoints} this week
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Rest of leaderboard */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Top Contributors</CardTitle>
          <CardDescription>Keep climbing the ranks!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.slice(3).map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-8 text-center font-bold text-lg text-muted-foreground">#{user.rank}</div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{user.displayName}</p>
                      <Badge variant="outline" className="text-xs">
                        Lvl {user.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{user.cityZone}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-primary">{user.points.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {user.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : user.trend === "down" ? (
                        <TrendingUp className="w-3 h-3 rotate-180 text-red-500" />
                      ) : (
                        <Zap className="w-3 h-3 text-yellow-500" />
                      )}
                      <span>+{user.weeklyPoints}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current user stats */}
      {currentUser && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/10 to-primary/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Medal className="w-5 h-5 text-primary" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-card">
                <p className="text-3xl font-bold text-primary">{currentUser.points.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Points</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card">
                <p className="text-3xl font-bold text-secondary">
                  #{leaderboard.findIndex((u) => u.id === currentUser.id) + 1}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Your Rank</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-muted-foreground">Next Level Progress</span>
                <span className="font-semibold">
                  {currentUser.points % 500} / 500 <span className="text-muted-foreground">XP</span>
                </span>
              </div>
              <Progress value={(currentUser.points % 500) / 5} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {500 - (currentUser.points % 500)} points until Level {currentUser.level + 1}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Your Badges
              </p>
              <div className="flex flex-wrap gap-2">
                {currentUser.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="gap-1.5 py-1.5 px-3">
                    <Star className="w-3 h-3" />
                    {badge
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full gap-2">
              <Zap className="w-4 h-4" />
              Earn More Points
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderCreateModal = () => (
    <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Create {createType === "post" ? "Post" : createType === "event" ? "Event" : "Challenge"}
          </DialogTitle>
          <DialogDescription>Share your ideas and engage with the community</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Type selector */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Content Type</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant={createType === "post" ? "default" : "outline"}
                className="h-auto flex-col gap-2 py-4"
                onClick={() => setCreateType("post")}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">Post</span>
                <span className="text-xs text-muted-foreground">Share updates</span>
              </Button>
              <Button
                type="button"
                variant={createType === "event" ? "default" : "outline"}
                className="h-auto flex-col gap-2 py-4"
                onClick={() => setCreateType("event")}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Event</span>
                <span className="text-xs text-muted-foreground">Organize meetup</span>
              </Button>
              <Button
                type="button"
                variant={createType === "challenge" ? "default" : "outline"}
                className="h-auto flex-col gap-2 py-4"
                onClick={() => setCreateType("challenge")}
              >
                <Target className="w-5 h-5" />
                <span className="font-semibold">Challenge</span>
                <span className="text-xs text-muted-foreground">Create contest</span>
              </Button>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-base">
                Title
              </Label>
              <Input id="title" placeholder="Give it a catchy title..." className="mt-2" />
            </div>

            <div>
              <Label htmlFor="description" className="text-base">
                Description
              </Label>
              <Textarea id="description" placeholder="Add details here..." rows={5} className="mt-2 resize-none" />
            </div>

            {/* Event-specific fields */}
            {createType === "event" && (
              <div className="space-y-4 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Event Details
                </h4>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Where is it happening?" className="mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" className="mt-2" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input id="capacity" type="number" placeholder="Maximum attendees" className="mt-2" />
                </div>
              </div>
            )}

            {/* Challenge-specific fields */}
            {createType === "challenge" && (
              <div className="space-y-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Challenge Details
                </h4>
                <div>
                  <Label htmlFor="reward">Reward Points</Label>
                  <Input id="reward" type="number" placeholder="100" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expires">Expires In</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="7">1 Week</SelectItem>
                      <SelectItem value="14">2 Weeks</SelectItem>
                      <SelectItem value="30">1 Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Media upload */}
            <div>
              <Label className="text-base">Media</Label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                  <ImageIcon className="w-6 h-6" />
                  <span className="text-sm">Add Photo</span>
                </Button>
                <Button type="button" variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                  <Video className="w-6 h-6" />
                  <span className="text-sm">Add Video</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 gap-2" onClick={() => setShowCreateModal(false)}>
              <Send className="w-4 h-4" />
              Publish
            </Button>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  La-Rouine
                </h1>
                <p className="text-xs text-muted-foreground">Connect. Create. Compete.</p>
              </div>
            </div>

            {/* User section */}
            {currentUser && (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3 pl-3 border-l">
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{currentUser.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold leading-none">{currentUser.displayName}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentUser.points.toLocaleString()} pts • Lvl {currentUser.level}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Create button */}
          <div className="mb-8">
            <Button
              size="lg"
              className="w-full gap-2 h-14 text-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="w-5 h-5" />
              Create Something Amazing
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-muted">
              <TabsTrigger value="feed" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <Home className="w-4 h-4" />
                Feed
              </TabsTrigger>
              <TabsTrigger value="clubs" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
                <Users className="w-4 h-4" />
                Clubs
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                <Trophy className="w-4 h-4" />
                Ranks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="mt-0">
              {renderFeed()}
            </TabsContent>

            <TabsContent value="clubs" className="mt-0">
              {renderClubs()}
            </TabsContent>

            <TabsContent value="leaderboard" className="mt-0">
              {renderLeaderboard()}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Create modal */}
      {renderCreateModal()}

      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 La-Rouine. Building community, one connection at a time.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
