import { useCallback } from "react";
import { difficultyGroups } from "@/data/exercises";

const STORAGE_KEY = "power-training-progress";

export interface ProgressData {
  completedSets: number[];
  currentSet: number;
  xp: number;
  dailyTryUsedAt?: string;
  lastFailedAt?: Record<number, string>;
}

const defaultProgress: ProgressData = {
  completedSets: [],
  currentSet: 1,
  xp: 0,
};

export function useProgress() {
  const getProgress = useCallback((): ProgressData => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress;
    } catch {
      return defaultProgress;
    }
  }, []);

  const saveProgress = useCallback((data: Partial<ProgressData>) => {
    const current = getProgress();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }, [getProgress]);

  const completeSet = useCallback((setId: number) => {
    const current = getProgress();
    const completedSets = current.completedSets.includes(setId)
      ? current.completedSets
      : [...current.completedSets, setId];
    
    return saveProgress({
      completedSets,
      currentSet: Math.max(current.currentSet, setId + 1),
      xp: current.xp + 50,
    });
  }, [getProgress, saveProgress]);

  const isSetUnlocked = useCallback((setId: number): boolean => {
    const progress = getProgress();

    const group = difficultyGroups.find(g => g.sets.includes(setId));
    if (!group) return true; // Unlock by default if not found in any group to prevent crashes

    const isFirstInGroup = group.sets[0] === setId;
    if (isFirstInGroup) return true;

    if (progress.completedSets.includes(setId)) return true;

    const higherGroups = difficultyGroups.filter(g => g.level > group.level);
    for (const hg of higherGroups) {
      if (progress.completedSets.includes(hg.sets[0])) {
        return true;
      }
    }

    const indexInGroup = group.sets.indexOf(setId);
    if (indexInGroup > 0) {
      const prevSetInGroup = group.sets[indexInGroup - 1];
      if (progress.completedSets.includes(prevSetInGroup)) {
        return true;
      }
    }

    return false;
  }, [getProgress]);

  const addXp = useCallback((amount: number) => {
    const current = getProgress();
    return saveProgress({ xp: current.xp + amount });
  }, [getProgress, saveProgress]);

  const recordDailyTry = useCallback(() => {
    return saveProgress({ dailyTryUsedAt: new Date().toISOString() });
  }, [saveProgress]);

  const isDailyTryAvailable = useCallback(() => {
    const progress = getProgress();
    if (!progress.dailyTryUsedAt) return true;
    
    const lastTry = new Date(progress.dailyTryUsedAt);
    const now = new Date();
    return lastTry.toDateString() !== now.toDateString();
  }, [getProgress]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { 
    getProgress, 
    saveProgress, 
    completeSet, 
    addXp, 
    resetProgress,
    recordDailyTry,
    isDailyTryAvailable,
    isSetUnlocked
  };
}
