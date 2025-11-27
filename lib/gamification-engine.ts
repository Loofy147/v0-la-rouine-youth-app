// Core gamification calculation engine

export interface GamificationConfig {
  pointsPerAction: Record<string, number>
  streakBonuses: Record<number, number>
  levelThresholds: number[]
}

export const defaultConfig: GamificationConfig = {
  pointsPerAction: {
    "post-created": 10,
    "challenge-submitted": 50,
    "challenge-approved": 100,
    "event-rsvp": 25,
    "event-attended": 75,
    "post-liked": 1,
    "comment-added": 5,
    "bounty-completed": 100,
    "friend-referred": 200,
  },
  streakBonuses: {
    3: 1.1, // 10% bonus at 3 days
    7: 1.25, // 25% bonus at 1 week
    14: 1.5, // 50% bonus at 2 weeks
    30: 2.0, // 2x multiplier at 1 month
  },
  levelThresholds: [0, 500, 1500, 3500, 7000, 12000, 18000, 25000, 35000, 50000],
}

export function calculatePoints(
  action: string,
  basePoints: number,
  streakDays: number,
  config: GamificationConfig = defaultConfig,
): number {
  const multiplier = config.streakBonuses[streakDays] || 1
  return Math.floor(basePoints * multiplier)
}

export function getLevelFromPoints(points: number, config: GamificationConfig = defaultConfig): number {
  let level = 0
  for (let i = config.levelThresholds.length - 1; i >= 0; i--) {
    if (points >= config.levelThresholds[i]) {
      level = i
      break
    }
  }
  return level
}

export function getNextLevelPoints(points: number, config: GamificationConfig = defaultConfig): number {
  const currentLevel = getLevelFromPoints(points, config)
  if (currentLevel >= config.levelThresholds.length - 1) {
    return config.levelThresholds[config.levelThresholds.length - 1]
  }
  return config.levelThresholds[currentLevel + 1]
}

export function getProgressToNextLevel(
  points: number,
  config: GamificationConfig = defaultConfig,
): {
  current: number
  required: number
  progress: number
} {
  const currentLevel = getLevelFromPoints(points, config)
  const currentThreshold = config.levelThresholds[currentLevel]
  const nextThreshold = config.levelThresholds[Math.min(currentLevel + 1, config.levelThresholds.length - 1)]

  const current = points - currentThreshold
  const required = nextThreshold - currentThreshold

  return {
    current,
    required,
    progress: (current / required) * 100,
  }
}
