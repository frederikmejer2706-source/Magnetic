import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingElements from "@/components/FloatingElements";
import { exerciseSets, difficultyGroups } from "@/data/exercises";
import { useProgress } from "@/hooks/useProgress";
import { Lock, CheckCircle2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { getProgress, isSetUnlocked } = useProgress();
  const progress = getProgress();
  const totalSets = exerciseSets.length;
  const completedCount = progress.completedSets.length;
  const overallProgress = totalSets > 0 ? Math.round((completedCount / totalSets) * 100) : 0;

  const nextSetId =
    exerciseSets.find(
      (s) => isSetUnlocked(s.id) && !progress.completedSets.includes(s.id)
    )?.id || 1;

  const firstSet = exerciseSets[0] || { title: "First Impressions", subtitle: "Master the start" };

  const handleStartTraining = () => {
    navigate(`/training/${nextSetId}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F7F7] dark:bg-background">
      {/* Hero */}
      <section className="relative min-h-[75vh] bg-[#58CC02] flex items-center overflow-hidden">
        <FloatingElements />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto md:mx-0"
          >
            <h1 className="text-7xl md:text-9xl font-black text-white leading-none mb-4 tracking-tighter">
              MAGNETIC
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-bold mb-10">
              Unstoppable presence. Natural influence.
            </p>
            
            <motion.button
              onClick={handleStartTraining}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 rounded-2xl font-black text-2xl bg-white text-[#58CC02] shadow-[0_8px_0_0_#46A302] mb-12"
            >
              {completedCount === 0 ? "START TRAINING" : "CONTINUE"}
            </motion.button>

            <div className="text-white/80 text-lg md:text-xl leading-relaxed font-bold max-w-md mx-auto md:mx-0">
              <p className="mb-2">Influence isn't dominance.</p>
              <p>It's staying grounded when others rush.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progress card */}
      <section className="relative -mt-20 z-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-white dark:bg-card rounded-[2.5rem] p-10 shadow-2xl border-b-8 border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-foreground mb-1">
                Your Progress
              </h2>
              <p className="text-muted-foreground text-lg font-bold">
                {completedCount} of {totalSets} days complete
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-6xl font-black text-[#58CC02] leading-none tracking-tighter">
                {overallProgress}%
              </p>
            </div>
          </div>
          
          <div className="h-8 rounded-full bg-gray-100 overflow-hidden border-4 border-gray-100 relative">
            <motion.div
              className="h-full rounded-full bg-[#58CC02]"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.2, ease: "circOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Training path */}
      <section className="px-6 py-20 bg-[#F7F7F7] dark:bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-12">
            {difficultyGroups.map((group) => (
              <div key={group.level} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-foreground mb-4">{group.label}</h2>
                  <div className="w-20 h-2 bg-[#58CC02] mx-auto rounded-full"></div>
                </div>
                
                <div className="space-y-6">
                  {exerciseSets
                    .filter((set) => group.sets.includes(set.id))
                    .map((set, i) => {
                      const isCompleted = progress.completedSets.includes(set.id);
                      const unlocked = isSetUnlocked(set.id);
                      const isNext = unlocked && !isCompleted;
                      const isLocked = !unlocked;

                      return (
                        <motion.div
                          key={set.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <button
                            onClick={() => !isLocked && navigate(`/training/${set.id}`)}
                            disabled={isLocked}
                            className={`w-full text-left p-8 rounded-[2rem] border-b-[6px] transition-all duration-200 flex items-center gap-6 group active:translate-y-1 active:border-b-0 ${
                              isCompleted
                                ? "bg-white border-green-200 hover:border-green-300"
                                : isNext
                                ? "bg-white border-[#58CC02] shadow-xl scale-[1.02] ring-4 ring-[#58CC02]/10"
                                : isLocked
                                ? "bg-gray-50 border-gray-200 opacity-60 grayscale cursor-not-allowed"
                                : "bg-white border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0 transition-transform group-hover:scale-110 ${
                              isLocked 
                                ? "bg-gray-200" 
                                : isCompleted 
                                ? "bg-green-100 text-green-600 shadow-[0_4px_0_0_#dcfce7]" 
                                : "bg-[#58CC02] shadow-[0_6px_0_0_#46A302] text-white"
                            }`}>
                              {isLocked ? <Lock className="w-8 h-8 text-gray-400" /> : set.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-sm font-black uppercase tracking-widest ${isLocked ? 'text-gray-400' : 'text-[#58CC02]'}`}>
                                  Day {set.day}
                                </span>
                                {isCompleted && (
                                  <div className="bg-[#58CC02] rounded-full p-1 shadow-sm">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </div>
                                )}
                              </div>
                              <h3 className="text-2xl font-black text-foreground leading-tight truncate">
                                {set.title}
                              </h3>
                              <p className="text-muted-foreground text-lg font-bold truncate">
                                {set.subtitle}
                              </p>
                            </div>

                            {isNext && (
                              <motion.span 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="px-6 py-3 rounded-2xl bg-[#58CC02] text-sm font-black text-white shadow-[0_4px_0_0_#46A302] hidden sm:block"
                              >
                                START
                              </motion.span>
                            )}
                          </button>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
