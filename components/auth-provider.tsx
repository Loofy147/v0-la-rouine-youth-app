"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  loading: boolean
  signin: (username: string, displayName: string) => Promise<void>
  signup: (username: string, displayName: string, phone?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("larouine_user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (error) {
        console.error("[v0] Failed to restore user session:", error)
      }
    }
    setLoading(false)
  }, [])

  const signin = async (username: string, displayName: string) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      displayName,
      avatar: `/placeholder.svg?height=100&width=100`,
      points: 0,
      badges: [],
      cityZone: "Downtown",
      trustScore: 50,
      level: 1,
      streakDays: 0,
      lastActivityDate: new Date(),
      referralCode: Math.random().toString(36).substr(2, 9),
      clans: [],
      createdAt: new Date(),
    }
    setUser(newUser)
    localStorage.setItem("larouine_user", JSON.stringify(newUser))
  }

  const signup = async (username: string, displayName: string, phone?: string) => {
    await signin(username, displayName)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("larouine_user")
  }

  return <AuthContext.Provider value={{ user, loading, signin, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
