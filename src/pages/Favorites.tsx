import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { exerciseSets } from "@/data/exercises";
import { dayMissions } from "@/data/missions";

const Favorites = () => {
  const { getFavorites, toggleFavorite } = useFavorites();
  const [favorites, setFavorites] = useState<number[]>(getFavorites());
  const navigate = useNavigate();

  const favoriteSets = exerciseSets.filter((set) => favorites.includes(set.id));

  const handleUnfavorite = (dayId: number) => {
    toggleFavorite(dayId);
    setFavorites(getFavorites());
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] dark:bg-background">
      {/* Header */}
      <div className="bg-[#FF6B6B] px-6 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Favourites</h1>
          <p className="text-white/80 font-bold text-lg">
            Your saved lessons. Come back to these anytime.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        {favoriteSets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-black text-foreground mb-3">No favourites yet</h2>
            <p className="text-muted-foreground font-bold mb-8 max-w-sm mx-auto">
              Go to Missions and tap the heart on any lesson you want to save here.
            </p>
            <button
              onClick={() => navigate("/missions")}
              className="px-8 py-4 rounded-2xl font-black text-lg bg-[#58CC02] text-white shadow-[0_4px_0_0_#46A302]"
            >
              GO TO MISSIONS
            </button>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {favoriteSets.map((set, i) => {
              const mission = dayMissions[set.day];
              return (
                <motion.div
                  key={set.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-3xl border-b-4 border-[#FF6B6B]/30 overflow-hidden"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-4 px-6 py-4 bg-[#FF6B6B]/10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#FF6B6B] shadow-[0_4px_0_0_#e05555] text-white">
                      {set.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                        Day {set.day}
                      </p>
                      <p className="text-lg font-black text-foreground">{set.title}</p>
                    </div>
                    <button
                      onClick={() => handleUnfavorite(set.id)}
                      className="w-10 h-10 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center hover:bg-[#FF6B6B]/20 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-[#FF6B6B] fill-[#FF6B6B]" />
                    </button>
                  </div>

                  {/* Mission text */}
                  <div className="px-6 py-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-[#58CC02] fill-[#58CC02]" />
                      <span className="text-xs font-black text-[#58CC02] uppercase tracking-wider">Mission</span>
                    </div>
                    <p className="text-base font-semibold text-foreground leading-relaxed">
                      {mission}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
