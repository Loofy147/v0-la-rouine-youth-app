// Trust Score Calculation Engine

export interface TrustFactors {
  phoneVerified: boolean
  emailVerified: boolean
  eventAttendance: number
  submissionsApproved: number
  submissionsRejected: number
  reportsReceived: number
  accountAge: number // days
}

export function calculateTrustScore(factors: TrustFactors): number {
  let score = 50 // Base score for any user

  // Verification
  if (factors.phoneVerified) score += 15
  if (factors.emailVerified) score += 10

  // Activity (positive)
  score += Math.min(factors.eventAttendance * 2, 20)
  score += Math.min(factors.submissionsApproved * 3, 20)

  // Penalties (negative)
  score -= Math.min(factors.submissionsRejected * 5, 30)
  score -= Math.min(factors.reportsReceived * 10, 30)

  // Account age bonus
  if (factors.accountAge > 30) score += 5
  if (factors.accountAge > 90) score += 5

  return Math.max(Math.min(score, 100), 0)
}

export function getTrustLevel(score: number): "new" | "trusted" | "verified" {
  if (score < 40) return "new"
  if (score < 70) return "trusted"
  return "verified"
}

export function canAutoApprove(trustScore: number): boolean {
  return trustScore >= 70
}

export function getAutoApprovalRules(trustLevel: "new" | "trusted" | "verified") {
  switch (trustLevel) {
    case "new":
      return { maxSubmissionsPerDay: 1, requiresApproval: true }
    case "trusted":
      return { maxSubmissionsPerDay: 5, requiresApproval: true }
    case "verified":
      return { maxSubmissionsPerDay: 20, requiresApproval: false }
  }
}
