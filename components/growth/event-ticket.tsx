"use client"

import html2canvas from "html2canvas"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Share2, Ticket } from "lucide-react"
import QRCode from "qrcode.react"

interface EventTicketProps {
  eventId: string
  eventTitle: string
  eventDate: Date
  eventLocation: string
  userName: string
  userAvatar: string
  ticketId: string
  onShare?: () => void
}

export function EventTicket({
  eventId,
  eventTitle,
  eventDate,
  eventLocation,
  userName,
  userAvatar,
  ticketId,
  onShare,
}: EventTicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return

    setIsGenerating(true)
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      })

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `larouine-ticket-${ticketId}.png`
      link.click()

      console.log("[v0] Ticket downloaded")
    } catch (error) {
      console.error("[v0] Failed to generate ticket:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleShareTicket = () => {
    if (navigator.share) {
      navigator.share({
        title: "I'm going to this event!",
        text: `Join me at ${eventTitle} on ${eventDate.toLocaleDateString()}`,
        url: window.location.href,
      })
    }
    onShare?.()
  }

  return (
    <div className="space-y-4">
      {/* Ticket Visual */}
      <div
        ref={ticketRef}
        className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-xl overflow-hidden"
      >
        <div className="relative p-6 space-y-4">
          {/* Ticket header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge className="gap-1 mb-2">
                <Ticket className="w-3 h-3" />
                Event Ticket
              </Badge>
              <h3 className="text-lg font-bold leading-tight">{eventTitle}</h3>
            </div>
            <div className="text-3xl font-bold text-primary/30">#</div>
          </div>

          {/* Event details */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-white/50 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground">Date & Time</p>
              <p className="text-sm font-semibold">{eventDate.toLocaleDateString()}</p>
              <p className="text-xs text-muted-foreground">
                {eventDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm font-semibold line-clamp-2">{eventLocation}</p>
            </div>
          </div>

          {/* Attendee info */}
          <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={userAvatar || "/placeholder.svg"} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Attendee</p>
              <p className="text-sm font-semibold">{userName}</p>
            </div>
          </div>

          {/* QR Code and Ticket ID */}
          <div className="flex items-end justify-between gap-4 pt-4 border-t border-white/20">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Ticket ID</p>
              <p className="text-xs font-mono font-bold text-primary">{ticketId}</p>
            </div>
            <QRCode value={ticketId} size={64} level="H" includeMargin={false} />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleDownloadTicket}
          disabled={isGenerating}
          variant="outline"
          className="flex-1 gap-2 bg-transparent"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button onClick={handleShareTicket} className="flex-1 gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Show your ticket at the event entrance or on your phone
      </p>
    </div>
  )
}
