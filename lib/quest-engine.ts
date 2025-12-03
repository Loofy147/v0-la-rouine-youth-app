// Quest and Achievement Engine

import type { Quest, UserQuest, Achievement, UserAchievement } from './types';

// --- Quest Management ---

/**
 * Checks if a user has completed a quest based on their progress.
 * @param quest The quest definition.
 * @param userQuest The user's progress on the quest.
 * @returns True if the quest is completed, false otherwise.
 */
export function isQuestCompleted(quest: Quest, userQuest: UserQuest): boolean {
  return quest.criteria.every(criterion => {
    const progress = userQuest.progress.find(p => p.eventType === criterion.eventType);
    return progress && progress.currentCount >= criterion.targetCount;
  });
}

/**
 * Updates a user's quest progress based on an event.
 * @param userQuest The user's current quest progress.
 * @param eventType The type of event that occurred.
 * @param eventCount The number of times the event occurred.
 * @returns The updated user quest progress.
 */
export function updateUserQuestProgress(userQuest: UserQuest, eventType: string, eventCount: number = 1): UserQuest {
  const newProgress = [...userQuest.progress];
  const progressIndex = newProgress.findIndex(p => p.eventType === eventType);

  if (progressIndex > -1) {
    newProgress[progressIndex].currentCount += eventCount;
  } else {
    newProgress.push({ eventType, currentCount: eventCount });
  }

  return { ...userQuest, progress: newProgress };
}

// --- Achievement Management ---

/**
 * Checks if a user has unlocked an achievement based on their metrics.
 * @param achievement The achievement definition.
 * @param userMetrics A record of the user's metrics (e.g., { 'posts-created': 10, 'events-attended': 5 }).
 * @returns True if the achievement is unlocked, false otherwise.
 */
export function isAchievementUnlocked(achievement: Achievement, userMetrics: Record<string, number>): boolean {
  return achievement.criteria.every(criterion => {
    const userValue = userMetrics[criterion.metric] || 0;
    return userValue >= criterion.targetValue;
  });
}
