"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Lock, Globe, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SafeSpaceToggleProps {
  clubId: string
  isPrivate: boolean
  onToggle?: (isPrivate: boolean) => void
}

export function SafeSpaceToggle({ clubId, isPrivate, onToggle }: SafeSpaceToggleProps) {
  const [tempIsPrivate, setTempIsPrivate] = useState(isPrivate)

  const handleToggle = () => {
    const newState = !tempIsPrivate
    setTempIsPrivate(newState)
    onToggle?.(newState)
    console.log(`[v0] Club ${clubId} is now ${newState ? "private" : "public"}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {tempIsPrivate ? (
              <>
                <Lock className="w-4 h-4 text-primary" />
                Private Space
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 text-muted-foreground" />
                Public Club
              </>
            )}
          </span>
          <Switch checked={tempIsPrivate} onCheckedChange={handleToggle} />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {tempIsPrivate ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Only invited members can see this club and its posts. Perfect for exclusive groups or women-only spaces.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Anyone can discover and join this club. All posts are visible to everyone.
            </AlertDescription>
          </Alert>
        )}

        <div
          className={`p-3 rounded border ${
            tempIsPrivate ? "bg-primary/10 border-primary/20" : "bg-muted/50 border-border/50"
          }`}
        >
          <p className="text-sm font-semibold mb-2">Current Setting</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            {tempIsPrivate ? (
              <>
                <p>✓ Invite-only membership</p>
                <p>✓ Hidden from search</p>
                <p>✓ Members control posts visibility</p>
              </>
            ) : (
              <>
                <p>✓ Open to all members</p>
                <p>✓ Appears in search and discovery</p>
                <p>✓ Public activity feeds</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
