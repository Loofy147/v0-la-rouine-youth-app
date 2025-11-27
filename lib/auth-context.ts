// Enhanced Auth Context with session management
import { createContext } from "react"
import type { User } from "@/lib/types"

export interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  sessionToken?: string
  signin: (username: string, displayName: string, phone?: string) => Promise<void>
  signup: (username: string, displayName: string, phone?: string) => Promise<void>
  logout: () => void
  refreshSession: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Session storage utilities
export const SessionManager = {
  setToken: (token: string) => {
    localStorage.setItem("larouine_token", token)
    localStorage.setItem("larouine_token_expires", (Date.now() + 30 * 24 * 60 * 60 * 1000).toString())
  },

  getToken: (): string | null => {
    const token = localStorage.getItem("larouine_token")
    const expires = localStorage.getItem("larouine_token_expires")

    if (!token || !expires) return null
    if (Date.now() > Number.parseInt(expires)) {
      SessionManager.clearToken()
      return null
    }

    return token
  },

  clearToken: () => {
    localStorage.removeItem("larouine_token")
    localStorage.removeItem("larouine_token_expires")
  },

  isSessionValid: (): boolean => {
    return SessionManager.getToken() !== null
  },
}
