"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Quest, UserQuest, Achievement, UserAchievement } from './types';

interface GamificationContextType {
  quests: Quest[];
  userQuests: UserQuest[];
  achievements: Achievement[];
  userAchievements: UserAchievement[];
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [userQuests, setUserQuests] = useState<UserQuest[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);

  useEffect(() => {
    const mockQuests: Quest[] = [
        {
            id: "1",
            title: "Community Starter",
            description: "Engage with the community to earn points.",
            criteria: [
                { description: "Create 3 posts", eventType: "post-created", targetCount: 3 },
                { description: "Comment on 5 posts", eventType: "comment-added", targetCount: 5 },
            ],
            reward: { points: 100, badgeId: "community-starter" },
            isRepeatable: false,
        },
        {
            id: "2",
            title: "Event Enthusiast",
            description: "Participate in local events.",
            criteria: [
                { description: "RSVP to 2 events", eventType: "event-rsvp", targetCount: 2 },
                { description: "Attend 1 event", eventType: "event-attended", targetCount: 1 },
            ],
            reward: { points: 150 },
            isRepeatable: true,
        }
    ];
    setQuests(mockQuests);

    const mockUserQuests: UserQuest[] = [
        {
            userId: "1",
            questId: "1",
            progress: [
                { eventType: "post-created", currentCount: 1 },
                { eventType: "comment-added", currentCount: 2 },
            ],
            status: 'in-progress',
            startedAt: new Date(),
        },
        {
            userId: "1",
            questId: "2",
            progress: [],
            status: 'in-progress',
            startedAt: new Date(),
        }
    ];
    setUserQuests(mockUserQuests);

    const mockAchievements: Achievement[] = [
        {
            id: "first-post",
            title: "First Post",
            description: "You shared your first post with the community!",
            icon: "Megaphone",
            criteria: [{ metric: "posts-created", targetValue: 1 }],
        },
        {
            id: "community-builder",
            title: "Community Builder",
            description: "You've created 10 posts and started a movement.",
            icon: "Users",
            criteria: [{ metric: "posts-created", targetValue: 10 }],
        }
    ];
    setAchievements(mockAchievements);

    const mockUserAchievements: UserAchievement[] = [
        {
            userId: "1",
            achievementId: "first-post",
            unlockedAt: new Date(),
        }
    ];
    setUserAchievements(mockUserAchievements);
  }, []);

  return <GamificationContext.Provider value={{ quests, userQuests, achievements, userAchievements }}>
      {children}
    </GamificationContext.Provider>
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
