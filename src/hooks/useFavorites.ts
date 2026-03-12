import { useCallback } from "react";

const FAVORITES_KEY = "magnetic-favorites";

export function useFavorites() {
  const getFavorites = useCallback((): number[] => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  const isFavorite = useCallback((dayId: number): boolean => {
    return getFavorites().includes(dayId);
  }, [getFavorites]);

  const toggleFavorite = useCallback((dayId: number): boolean => {
    const current = getFavorites();
    const updated = current.includes(dayId)
      ? current.filter((id) => id !== dayId)
      : [...current, dayId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated.includes(dayId);
  }, [getFavorites]);

  return { getFavorites, isFavorite, toggleFavorite };
}
