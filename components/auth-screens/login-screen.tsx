"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, MessageCircle, Mail, Flame, AlertCircle, Loader2 } from "lucide-react"

interface LoginScreenProps {
  onLoginSuccess: (username: string, displayName: string, phone?: string) => void
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [authMethod, setAuthMethod] = useState<"whatsapp" | "magic-link">("whatsapp")
  const [phoneOrEmail, setPhoneOrEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [step, setStep] = useState<"send" | "verify" | "profile">("send")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)

  const handleSendCode = async () => {
    setError(null)

    if (authMethod === "whatsapp" && !phoneOrEmail.match(/^\+?[0-9]{10,}$/)) {
      setError("Please enter a valid phone number")
      return
    }

    if (authMethod === "magic-link" && !phoneOrEmail.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log(`[v0] Sent ${authMethod === "whatsapp" ? "WhatsApp" : "Magic Link"} code to ${phoneOrEmail}`)
      setStep("verify")
    } catch (err) {
      setError("Failed to send code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    setError(null)

    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit code")
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(`[v0] Code verified successfully for ${phoneOrEmail}`)
      setVerified(true)
      setStep("profile")
    } catch (err) {
      setError("Invalid verification code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProfile = () => {
    if (!username || !displayName) {
      setError("Please fill in all fields")
      return
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters")
      return
    }

    onLoginSuccess(username, displayName, authMethod === "whatsapp" ? phoneOrEmail : undefined)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">La-Rouine</CardTitle>
          <CardDescription>Join your local community movement</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === "send" && (
            <div className="space-y-4">
              <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="whatsapp" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </TabsTrigger>
                  <TabsTrigger value="magic-link" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="contact">{authMethod === "whatsapp" ? "Phone Number" : "Email Address"}</Label>
                <Input
                  id="contact"
                  type={authMethod === "whatsapp" ? "tel" : "email"}
                  placeholder={authMethod === "whatsapp" ? "+1 (555) 123-4567" : "you@example.com"}
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="text-base"
                />
                <p className="text-xs text-muted-foreground">
                  {authMethod === "whatsapp"
                    ? "We'll send a 6-digit code via WhatsApp"
                    : "We'll send a magic link to your email"}
                </p>
              </div>

              <Button onClick={handleSendCode} disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  `Send ${authMethod === "whatsapp" ? "Code" : "Link"}`
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">Fast, passwordless, and secure</p>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Sent to <span className="font-semibold">{phoneOrEmail}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-2xl tracking-widest font-mono"
                />
              </div>

              <Button onClick={handleVerifyCode} disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setStep("send")
                  setVerificationCode("")
                }}
                className="w-full"
              >
                Back
              </Button>
            </div>
          )}

          {step === "profile" && verified && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                  {authMethod === "whatsapp" ? "Phone verified" : "Email verified"}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 bg-muted rounded-md text-muted-foreground">@</span>
                  <Input
                    id="username"
                    placeholder="alex_creative"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Unique username for your profile</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  placeholder="Alex Martinez"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <Button onClick={handleCreateProfile} className="w-full" size="lg">
                Complete Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
