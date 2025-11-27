"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Loader2, Wifi, WifiOff } from "lucide-react"

interface QueuedItem {
  id: string
  type: "post" | "like" | "comment"
  data: Record<string, any>
  timestamp: Date
  status: "pending" | "syncing" | "success" | "error"
}

export function SyncQueueIndicator() {
  const [queue, setQueue] = useState<QueuedItem[]>([])
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true)
  const [showQueue, setShowQueue] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Simulate syncing when online
  useEffect(() => {
    if (isOnline && queue.length > 0) {
      const pendingItems = queue.filter((item) => item.status === "pending")
      if (pendingItems.length > 0) {
        console.log(`[v0] Syncing ${pendingItems.length} items...`)

        pendingItems.forEach((item) => {
          setTimeout(() => {
            setQueue((prev) => prev.map((q) => (q.id === item.id ? { ...q, status: "success" } : q)))
          }, Math.random() * 2000)
        })
      }
    }
  }, [isOnline, queue])

  if (!showQueue) {
    return (
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setShowQueue(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border shadow-lg hover:shadow-xl transition-all"
        >
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-xs font-semibold">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-xs font-semibold text-red-600">Offline</span>
            </>
          )}

          {queue.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {queue.filter((q) => q.status === "pending").length}
            </Badge>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <div className="bg-card border border-border rounded-lg shadow-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Sync Queue</h3>
          <button onClick={() => setShowQueue(false)} className="text-muted-foreground hover:text-foreground">
            ×
          </button>
        </div>

        <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
          {isOnline ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Connected - Syncing changes</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 animate-pulse" />
              <span className="text-xs text-muted-foreground">Offline - Changes saved locally</span>
            </>
          )}
        </div>

        {queue.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">No pending items</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {queue.map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border/50">
                {item.status === "pending" && (
                  <Loader2 className="w-4 h-4 text-yellow-500 animate-spin flex-shrink-0" />
                )}
                {item.status === "syncing" && <Loader2 className="w-4 h-4 text-blue-500 animate-spin flex-shrink-0" />}
                {item.status === "success" && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
                {item.status === "error" && <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold capitalize truncate">{item.type}</p>
                  <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
