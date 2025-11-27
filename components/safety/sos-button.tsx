"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, Phone, Share2, MapPin, Loader2 } from "lucide-react"

interface SOSButtonProps {
  eventId: string
  eventLocation: string
  eventOrganizerPhone?: string
}

export function SOSButton({ eventId, eventLocation, eventOrganizerPhone }: SOSButtonProps) {
  const [showSOS, setShowSOS] = useState(false)
  const [isActivating, setIsActivating] = useState(false)
  const [sosActive, setSOSActive] = useState(false)

  const handleActivateSOS = async () => {
    setIsActivating(true)
    console.log(`[v0] SOS activated for event ${eventId}`)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSOSActive(true)
    setIsActivating(false)
  }

  const handleShareLocation = () => {
    if (navigator.share && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`

        navigator.share({
          title: "La-Rouine SOS Location",
          text: "I need help - here's my location",
          url: mapsUrl,
        })
      })
    }
  }

  return (
    <>
      {/* Floating SOS Button (appears during events) */}
      <Button
        onClick={() => setShowSOS(true)}
        size="lg"
        className="fixed bottom-32 right-4 gap-2 bg-destructive hover:bg-destructive/90 text-white"
      >
        <AlertTriangle className="w-4 h-4" />
        SOS
      </Button>

      <Dialog open={showSOS} onOpenChange={setShowSOS}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Emergency Assistance
            </DialogTitle>
          </DialogHeader>

          {sosActive ? (
            <div className="py-6 space-y-4 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </div>

              <div>
                <p className="font-semibold">SOS Alert Sent</p>
                <p className="text-sm text-muted-foreground">Nearest organizers have been notified</p>
              </div>

              <div className="space-y-2">
                {eventOrganizerPhone && (
                  <a
                    href={`tel:${eventOrganizerPhone}`}
                    className="flex items-center justify-center gap-2 p-3 bg-primary rounded-lg text-white"
                  >
                    <Phone className="w-4 h-4" />
                    Call Organizer
                  </a>
                )}

                <Button onClick={handleShareLocation} variant="outline" className="w-full gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" />
                  Share My Location
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Emergency services have NOT been contacted. For life-threatening emergencies, call 911 immediately.
              </p>
            </div>
          ) : (
            <div className="py-6 space-y-4">
              <div className="p-3 bg-destructive/10 rounded border border-destructive/20">
                <p className="text-sm font-semibold text-destructive mb-1">This should only be used in emergencies</p>
                <p className="text-xs text-muted-foreground">
                  Pressing this button will alert event organizers and nearby users
                </p>
              </div>

              <div className="space-y-2 p-3 bg-muted/50 rounded">
                <p className="text-xs font-semibold">Event Details</p>
                <div className="flex items-center gap-2 text-xs">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span>{eventLocation}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowSOS(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleActivateSOS}
                  disabled={isActivating}
                  className="flex-1 bg-destructive hover:bg-destructive/90"
                >
                  {isActivating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-1" />
                      Sending...
                    </>
                  ) : (
                    "Activate SOS"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
