// Core domain types for La-Rouine platform

export interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  phone?: string
  bio?: string
  cityZone: string
  points: number
  badges: Badge[]
  createdAt: Date
  trustScore: number
  level: number
  streakDays: number
  lastActivityDate: Date
  referralCode: string
  clans: string[]
}

export interface Club {
  id: string
  name: string
  slug: string
  description: string
  ownerId: string
  privacy: "public" | "private"
  tags: string[]
  avatar: string
  members: number
  createdAt: Date
}

export interface Post {
  id: string
  type: "post" | "event" | "challenge"
  authorId: string
  author?: User
  clubId?: string
  club?: Club
  title: string
  body: string
  mediaUrl?: string
  meta?: Record<string, any>
  likes: number
  comments: number
  createdAt: Date
  expiresAt?: Date
}

export interface Event extends Post {
  type: "event"
  meta: {
    startsAt: Date
    location: string
    capacity: number
    attendeesCount: number
  }
}

export interface Challenge extends Post {
  type: "challenge"
  meta: {
    rewardPoints: number
    submissionsCount: number
    criteria?: Record<string, any>
  }
}

export interface Submission {
  id: string
  challengeId: string
  userId: string
  user?: User
  mediaUrl?: string
  mediaBlurHash?: string
  text?: string
  status: "pending" | "approved" | "rejected"
  votes: number
  createdAt: Date
  requiresManualApproval: boolean
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  criteria: Record<string, any>
}

export interface UserBadge {
  userId: string
  badgeId: string
  earnedAt: Date
}

export interface LeaderboardEntry {
  rank: number
  user: User
  points: number
  period: "daily" | "weekly" | "monthly" | "all-time"
}

export interface ClubMember {
  clubId: string
  userId: string
  role: "owner" | "admin" | "member"
  joinedAt: Date
}

export interface Message {
  id: string
  clubId: string
  userId: string
  user?: User
  content: string
  createdAt: Date
}

export interface Streak {
  userId: string
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  lastResetDate?: Date
}

export interface Bounty {
  id: string
  clubId: string
  creatorId: string
  title: string
  description: string
  rewardPoints: number
  completions: number
  maxCompletions?: number
  criteria: Record<string, any>
  expiresAt: Date
  createdAt: Date
}

export interface Clan {
  id: string
  name: string
  leaderId: string
  members: string[]
  totalPoints: number
  clanbadges: string[]
  createdAt: Date
}

export interface TrustLog {
  userId: string
  eventType: "verified_phone" | "attended_event" | "submission_approved" | "content_flagged"
  score: number
  timestamp: Date
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
