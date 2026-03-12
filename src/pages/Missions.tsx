import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Target, Heart } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useFavorites } from "@/hooks/useFavorites";
import { exerciseSets } from "@/data/exercises";
import { dayMissions } from "@/data/missions";

const Missions = () => {
  const { getProgress } = useProgress();
  const { isFavorite, toggleFavorite } = useFavorites();
  const progress = getProgress();
  const [favoriteState, setFavoriteState] = useState<Record<number, boolean>>(
    () => Object.fromEntries(exerciseSets.map((s) => [s.id, isFavorite(s.id)]))
  );

  const handleToggleFavorite = (setId: number) => {
    toggleFavorite(setId);
    setFavoriteState((prev) => ({ ...prev, [setId]: !prev[setId] }));
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-background">
      {/* Header */}
      <div className="bg-[#58CC02] px-6 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Missions</h1>
          <p className="text-white/80 font-bold text-lg">
            Real world challenges. Complete a day to unlock its mission.
          </p>
        </motion.div>
      </div>

      {/* Mission cards */}
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-5">
        {exerciseSets.map((set, i) => {
          const isUnlocked = progress.completedSets.includes(set.id);
          const mission = dayMissions[set.day];
          const favorited = favoriteState[set.id];

          return (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-3xl border-b-4 overflow-hidden ${
                isUnlocked
                  ? "bg-white border-[#58CC02]/30"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              {/* Card header */}
              <div className={`flex items-center gap-4 px-6 py-4 ${isUnlocked ? "bg-[#58CC02]/10" : "bg-gray-100"}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                  isUnlocked
                    ? "bg-[#58CC02] shadow-[0_4px_0_0_#46A302] text-white"
                    : "bg-gray-200"
                }`}>
                  {isUnlocked ? set.icon : <Lock className="w-5 h-5 text-gray-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                    Day {set.day}
                  </p>
                  <p className="text-lg font-black text-foreground">{set.title}</p>
                </div>

                {isUnlocked && (
                  <button
                    onClick={() => handleToggleFavorite(set.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      favorited
                        ? "bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        favorited ? "text-[#FF6B6B] fill-[#FF6B6B]" : "text-gray-400"
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Mission text */}
              <div className="px-6 py-5">
                {isUnlocked ? (
                  <p className="text-base font-semibold text-foreground leading-relaxed">
                    {mission}
                  </p>
                ) : (
                  <p className="text-sm font-bold text-muted-foreground">
                    Complete Day {set.day} exercises to unlock this mission.
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Missions;
