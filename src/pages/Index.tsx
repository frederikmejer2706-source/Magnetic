import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { exerciseSets, difficultyGroups } from "@/data/exercises";
import { useProgress } from "@/hooks/useProgress";
import { CheckCircle2, Star, BookOpen, Lock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { getProgress, isSetUnlocked } = useProgress();
  const progress = getProgress();

  const getAlignmentClass = (index: number) => {
    const pattern = [
      "justify-center",
      "justify-center -translate-x-12 md:-translate-x-20",
      "justify-center",
      "justify-center translate-x-12 md:translate-x-20",
    ];
    return pattern[index % 4];
  };

  const difficultyColors: Record<number, { bg: string; shadow: string; label: string }> = {
    1: { bg: "#58CC02", shadow: "#46A302", label: "Beginner" },
    2: { bg: "#E67E22", shadow: "#D35400", label: "Intermediate" },
    3: { bg: "#E74C3C", shadow: "#C0392B", label: "Advanced" },
    4: { bg: "#9B59B6", shadow: "#7D3C98", label: "True Master" },
  };

  return (
    <div className="min-h-full bg-[#F7F7F7] dark:bg-background text-foreground pb-24 font-['Nunito']">
      <div className="max-w-xl mx-auto px-6 py-8">
        <div className="relative mb-16">
          <div className="bg-[#E67E22] rounded-3xl p-8 text-white shadow-[0_8px_0_0_#D35400] relative overflow-hidden group">
            <div className="relative z-10 flex justify-between items-start gap-2 flex-wrap">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-wide opacity-90 mb-1">Unit 1</h2>
                <p className="text-xl font-bold">Foundations of Charisma</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-2 text-sm font-black uppercase transition-all">
                <BookOpen className="w-4 h-4" /> GUIDEBOOK
              </button>
            </div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 skew-y-[-5deg] -translate-y-8" />
          </div>
        </div>

        {difficultyGroups.map((group, groupIndex) => {
          const groupSets = exerciseSets.filter(s => group.sets.includes(s.id));
          const colors = difficultyColors[group.level];

          return (
            <div key={group.level}>
              <div className={`flex items-center gap-3 ${groupIndex === 0 ? "mb-14" : "my-14"}`}>
                <div className="flex-1 h-px bg-border" />
                <div
                  className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white"
                  style={{ backgroundColor: colors.bg }}
                  data-testid={`label-difficulty-${group.level}`}
                >
                  {colors.label}
                </div>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="flex flex-col gap-12 md:gap-16">
                {groupSets.map((set, i) => {
                  const globalIndex = exerciseSets.findIndex(s => s.id === set.id);
                  const isCompleted = progress.completedSets.includes(set.id);
                  const unlocked = isSetUnlocked(set.id);
                  const isLocked = !isCompleted && !unlocked;
                  const hasExercises = set.exercises && set.exercises.length > 0;
                  const alignment = getAlignmentClass(globalIndex);

                  const isNextToPlay = unlocked && !isCompleted && hasExercises && 
                    !groupSets.some(s => s.id < set.id && !progress.completedSets.includes(s.id) && isSetUnlocked(s.id));

                  const handleNodeClick = () => {
                    if (isCompleted || unlocked) {
                      navigate(`/training/${set.id}`);
                    }
                  };

                  const isClickable = isCompleted || unlocked;

                  return (
                    <div key={set.id} className={`flex ${alignment}`} data-testid={`node-exercise-${set.id}`}>
                      <div className="relative">
                        <div className="relative flex flex-col items-center">
                          {isNextToPlay && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -top-12 px-4 py-2 rounded-xl font-black text-xs shadow-xl z-20 whitespace-nowrap text-white"
                              style={{ backgroundColor: colors.bg }}
                            >
                              START
                              <div
                                className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent"
                                style={{ borderTopColor: colors.bg }}
                              />
                            </motion.div>
                          )}

                          <motion.button
                            whileHover={isClickable ? { scale: 1.1 } : {}}
                            whileTap={isClickable ? { scale: 0.9 } : {}}
                            onClick={handleNodeClick}
                            disabled={!isClickable}
                            data-testid={`button-exercise-${set.id}`}
                            className={`
                              w-20 h-20 rounded-full flex items-center justify-center relative transition-all duration-200
                              ${isCompleted 
                                ? "bg-[#58CC02] shadow-[0_6px_0_0_#46A302] border-b-2 border-white/20 cursor-pointer" 
                                : unlocked && hasExercises
                                ? "animate-pulse-glow cursor-pointer"
                                : unlocked && !hasExercises
                                ? "opacity-50 cursor-pointer"
                                : "bg-[#E5E5E5] shadow-[0_6px_0_0_#AFAFAF] cursor-not-allowed"
                              }
                            `}
                            style={
                              !isCompleted && unlocked
                                ? { backgroundColor: colors.bg, boxShadow: `0 8px 0 0 ${colors.shadow}` }
                                : undefined
                            }
                          >
                            {isLocked ? (
                              <Lock className="w-8 h-8 text-muted-foreground/40" />
                            ) : (
                              <Star className={`w-10 h-10 ${
                                isCompleted || unlocked
                                  ? "text-white fill-white" 
                                  : "text-muted-foreground/40"
                              }`} />
                            )}
                            
                            {isCompleted && (
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                                <CheckCircle2 className="w-5 h-5 text-[#58CC02]" />
                              </div>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
