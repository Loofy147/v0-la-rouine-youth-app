// Content moderation and safety engine

export interface ContentReport {
  id: string
  targetId: string
  targetType: "post" | "user" | "event"
  reason: string
  details: string
  reporterId: string
  status: "pending" | "reviewed" | "actioned" | "dismissed"
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
}

export interface ModerationAction {
  id: string
  reportId: string
  action: "warning" | "remove" | "hide" | "ban"
  reason: string
  timestamp: Date
}

// Simple content filtering (in production, use ML moderation services like Perspective API)
const flaggedKeywords = [
  "hate",
  "racist",
  "discrimination",
  // ... add more as needed
]

export function performBasicContentCheck(text: string): {
  isFlagged: boolean
  flags: string[]
} {
  const lowercased = text.toLowerCase()
  const flags = flaggedKeywords.filter((keyword) => lowercased.includes(keyword))

  return {
    isFlagged: flags.length > 0,
    flags,
  }
}

export function calculateReportSeverity(reason: string): "low" | "medium" | "high" | "critical" {
  const highSeverityReasons = ["harassment", "hate-speech", "scam"]
  const criticalReasons = ["child-safety", "physical-threat"]

  if (criticalReasons.some((r) => reason.includes(r))) return "critical"
  if (highSeverityReasons.some((r) => reason.includes(r))) return "high"
  if (reason.includes("spam")) return "medium"

  return "low"
}

export function shouldAutoRemoveContent(
  severity: "low" | "medium" | "high" | "critical",
  reportCount: number,
): boolean {
  // Auto-remove if critical + multiple reports, or high severity + many reports
  if (severity === "critical" && reportCount >= 1) return true
  if (severity === "high" && reportCount >= 3) return true
  if (severity === "medium" && reportCount >= 5) return true

  return false
}
