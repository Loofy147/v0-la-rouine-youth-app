"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Trophy, Calendar, Target, MapPin, Clock } from "lucide-react"
import type { Post, User } from "@/lib/types"

interface PostCardProps {
  post: Post
  currentUser?: User
  onLike?: (postId: string) => void
  onRSVP?: (postId: string) => void
  onSubmit?: (postId: string) => void
}

export function PostCard({ post, currentUser, onLike, onRSVP, onSubmit }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.meta?.isLiked || false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(post.id)
  }

  const getPostIcon = () => {
    switch (post.type) {
      case "challenge":
        return <Target className="w-3 h-3" />
      case "event":
        return <Calendar className="w-3 h-3" />
      default:
        return null
    }
  }

  const getPostBadgeVariant = () => {
    switch (post.type) {
      case "challenge":
        return "default"
      case "event":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/10">
              <AvatarImage src={post.author?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {post.author?.displayName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">{post.author?.displayName}</p>
                <Badge variant="outline" className="text-xs">
                  Lvl {post.author?.level || 1}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>@{post.author?.username}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Badge variant={getPostBadgeVariant() as any} className="gap-1">
            {getPostIcon()}
            {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-base leading-relaxed">{post.title}</h3>
          {post.body && <p className="text-sm text-muted-foreground leading-relaxed mt-1">{post.body}</p>}
        </div>

        {post.meta?.mediaUrl && (
          <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={post.meta.mediaUrl || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {post.type === "event" && post.meta?.startsAt && (
          <div className="flex flex-col gap-2 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-secondary" />
              <span>{new Date(post.meta.startsAt).toLocaleString()}</span>
            </div>
            {post.meta?.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>{post.meta.location}</span>
              </div>
            )}
            <div className="text-xs text-muted-foreground">{post.meta?.attendeesCount || 0} attendees</div>
          </div>
        )}

        {post.type === "challenge" && post.meta?.rewardPoints && (
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">{post.meta.rewardPoints} points</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {post.meta?.submissionsCount || 0} submissions
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <Button variant="ghost" size="sm" className="gap-2 h-8" onClick={handleLike}>
            <Heart
              className="w-4 h-4"
              fill={isLiked ? "currentColor" : "none"}
              color={isLiked ? "hsl(0, 84%, 60%)" : "currentColor"}
            />
            <span className="text-xs">{post.meta?.likes || 0}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 h-8">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">{post.meta?.comments || 0}</span>
          </Button>
          {post.type === "event" && (
            <Button variant="ghost" size="sm" className="gap-2 h-8 text-secondary" onClick={() => onRSVP?.(post.id)}>
              <Calendar className="w-4 h-4" />
              <span className="text-xs">RSVP</span>
            </Button>
          )}
          {post.type === "challenge" && (
            <Button variant="ghost" size="sm" className="gap-2 h-8 text-primary" onClick={() => onSubmit?.(post.id)}>
              <Target className="w-4 h-4" />
              <span className="text-xs">Submit</span>
            </Button>
          )}
          <Button variant="ghost" size="sm" className="gap-2 h-8">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
