"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface OptimisticLikeButtonProps {
  initialLikes: number
  postId: string
  onLike: (postId: string) => Promise<void>
}

export function OptimisticLikeButton({ initialLikes, postId, onLike }: OptimisticLikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const [isPending, startTransition] = useTransition()

  const handleLike = () => {
    const newIsLiked = !isLiked
    const newLikes = newIsLiked ? likes + 1 : likes - 1

    setIsLiked(newIsLiked)
    setLikes(newLikes)

    startTransition(async () => {
      try {
        await onLike(postId)
      } catch (error) {
        setIsLiked(!newIsLiked)
        setLikes(likes)
        console.error("[v0] Like failed:", error)
      }
    })
  }

  return (
    <Button variant="ghost" size="sm" className="gap-2 h-8" onClick={handleLike} disabled={isPending}>
      <Heart
        className="w-4 h-4"
        fill={isLiked ? "currentColor" : "none"}
        color={isLiked ? "hsl(0, 84%, 60%)" : "currentColor"}
      />
      <span className="text-xs">{likes}</span>
    </Button>
  )
}
