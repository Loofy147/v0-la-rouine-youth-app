"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Mail, Loader2 } from "lucide-react"

interface MagicLinkProps {
  email: string
  onExpired: () => void
  onVerified: () => void
}

export function MagicLinkVerification({ email, onExpired, onVerified }: MagicLinkProps) {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onExpired()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onExpired])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-secondary" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">We sent a magic link to</p>
            <p className="font-semibold break-all">{email}</p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-xs text-muted-foreground">Magic link expires in</p>
            <p className="font-mono text-2xl font-bold text-primary">{formatTime(timeLeft)}</p>
          </div>

          <Button
            onClick={() => {
              setIsVerifying(true)
              setTimeout(() => {
                onVerified()
              }, 1500)
            }}
            disabled={isVerifying}
            className="w-full"
            size="lg"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                I've Verified My Email
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            Didn't receive it? Check your spam folder or request a new link
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
