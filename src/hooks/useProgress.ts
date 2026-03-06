import { useCallback } from "react";

const STORAGE_KEY = "magnetic-training-progress";

export interface ProgressData {
  completedSets: number[];
  currentSet: number;
  currentExercise: number;
  xp: number;
}

const defaultProgress: ProgressData = {
  completedSets: [],
  currentSet: 1,
  currentExercise: 0,
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
      currentExercise: 0,
      xp: current.xp + 50,
    });
  }, [getProgress, saveProgress]);

  const addXp = useCallback((amount: number) => {
    const current = getProgress();
    return saveProgress({ xp: current.xp + amount });
  }, [getProgress, saveProgress]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isSetUnlocked = useCallback((setId: number): boolean => {
    const progress = getProgress();
    if (setId === 1) return true;
    
    // Check if previous set is completed
    return progress.completedSets.includes(setId - 1);
  }, [getProgress]);

  return { 
    getProgress, 
    saveProgress, 
    completeSet, 
    addXp, 
    resetProgress, 
    isSetUnlocked 
  };
}
