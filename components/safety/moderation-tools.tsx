"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Flag, CheckCircle2 } from "lucide-react"

interface ModerationToolsProps {
  postId: string
  postAuthor: string
  onReportSubmit?: (reason: string, details: string) => void
}

export function ModerationTools({ postId, postAuthor, onReportSubmit }: ModerationToolsProps) {
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportReason, setReportReason] = useState<string>("")
  const [reportDetails, setReportDetails] = useState("")
  const [reportSubmitted, setReportSubmitted] = useState(false)

  const reportReasons = [
    { value: "inappropriate", label: "Inappropriate Content" },
    { value: "harassment", label: "Harassment or Hate Speech" },
    { value: "spam", label: "Spam" },
    { value: "fake-event", label: "Fake Event" },
    { value: "scam", label: "Scam or Deceptive" },
    { value: "other", label: "Other" },
  ]

  const handleSubmitReport = () => {
    if (!reportReason || !reportDetails.trim()) return

    console.log(`[v0] Report submitted for post ${postId}:`, {
      reason: reportReason,
      details: reportDetails,
    })

    onReportSubmit?.(reportReason, reportDetails)
    setReportSubmitted(true)

    setTimeout(() => {
      setShowReportDialog(false)
      setReportSubmitted(false)
      setReportReason("")
      setReportDetails("")
    }, 2000)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={() => setShowReportDialog(true)}
      >
        <Flag className="w-4 h-4" />
        <span className="text-xs">Report</span>
      </Button>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Report Content
            </DialogTitle>
            <DialogDescription>Help us keep La-Rouine safe for everyone</DialogDescription>
          </DialogHeader>

          {reportSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <div>
                <p className="font-semibold">Thank you</p>
                <p className="text-sm text-muted-foreground">Our moderation team will review your report</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">What's the issue?</label>
                <Select value={reportReason} onValueChange={setReportReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    {reportReasons.map((reason) => (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Additional Details (Optional)</label>
                <Textarea
                  placeholder="Describe what happened..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">{reportDetails.length}/500</p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Your report is anonymous and confidential. We take all reports seriously.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowReportDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSubmitReport} disabled={!reportReason} className="flex-1">
                  Submit Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
