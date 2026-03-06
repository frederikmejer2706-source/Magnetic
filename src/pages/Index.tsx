import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingElements from "@/components/FloatingElements";
import { exerciseSets } from "@/data/exercises";
import { useProgress } from "@/hooks/useProgress";
import { Lock, CheckCircle2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { getProgress } = useProgress();
  const progress = getProgress();
  const totalSets = exerciseSets.length;
  const completedCount = progress.completedSets.length;
  const overallProgress = Math.round((completedCount / totalSets) * 100);

  const nextSetId =
    exerciseSets.find(
      (s) => !s.locked && !progress.completedSets.includes(s.id)
    )?.id || 1;

  // Unlock logic: a set is available if the previous set is completed
  const isAvailable = (setId: number) => {
    if (setId === 1) return true;
    return progress.completedSets.includes(setId - 1);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[80vh] power-gradient-bg flex items-center overflow-hidden">
        <FloatingElements />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-6"
            >
              <span className="text-sm font-bold text-white/80 tracking-wider uppercase">
                Pillar 1 of 4
              </span>
            </motion.div>

            <h1 className="text-7xl md:text-8xl text-power-title leading-none mb-4">
              POWER
            </h1>
            <p className="text-xl text-white/80 font-semibold mb-4">
              Calm control. Silent influence.
            </p>
            <div className="text-white/60 text-lg leading-relaxed">
              <p className="mb-1">Power isn't dominance.</p>
              <p>It's the ability to influence your environment —</p>
              <p>by staying grounded when others rush.</p>
            </div>

            {progress.xp > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
              >
                <span className="text-lg">⚡</span>
                <span className="text-sm font-bold text-white">
                  {progress.xp} XP
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Progress card */}
      <section className="relative -mt-16 z-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto card-elevated p-8"
        >
          <h2 className="text-xl font-black text-foreground mb-6">
            Week 1 — First Impressions
          </h2>
          <div className="space-y-3 mb-6">
            {[
              { icon: "⚡", text: "Break the autopilot answer" },
              { icon: "🤝", text: "Greet every person in the room" },
              { icon: "🧍", text: "Own your body language" },
              { icon: "👁️", text: "Master eye contact" },
              { icon: "🗣️", text: "Craft answers that open doors" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-semibold text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="mb-2">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-muted-foreground">
                Progress
              </span>
              <span className="text-sm font-bold text-accent">
                {overallProgress}%
              </span>
            </div>
            <div className="h-4 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full accent-gradient-bar"
                initial={{ width: 0 }}
                whileInView={{ width: `${overallProgress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            {completedCount} of {totalSets} days complete
          </p>
        </motion.div>
      </section>

      {/* Training path */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-foreground text-center mb-4"
          >
            Your Training Path
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground font-medium mb-10"
          >
            Complete each day to unlock the next
          </motion.p>

          <div className="space-y-4">
            {exerciseSets.map((set, i) => {
              const isCompleted = progress.completedSets.includes(set.id);
              const available = isAvailable(set.id);
              const isNext = available && !isCompleted;
              const isLocked = !available;

              return (
                <motion.button
                  key={set.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => !isLocked && navigate(`/training/${set.id}`)}
                  disabled={isLocked}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    isCompleted
                      ? "bg-green-50 border-green-300"
                      : isNext
                      ? "bg-card border-accent shadow-lg animate-pulse-glow cursor-pointer active:scale-[0.98]"
                      : isLocked
                      ? "bg-muted/50 border-border/50 opacity-50 cursor-not-allowed"
                      : "bg-card border-border hover:border-primary/50 cursor-pointer active:scale-[0.98]"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    isCompleted ? "bg-green-100" : isLocked ? "bg-muted" : "accent-gradient"
                  }`}>
                    {isLocked ? "🔒" : set.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Day {set.day}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <h3 className="font-bold text-foreground truncate">
                      {set.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {set.subtitle}
                    </p>
                  </div>

                  {isNext && (
                    <span className="px-3 py-1 rounded-full accent-gradient text-xs font-bold text-white shrink-0">
                      START
                    </span>
                  )}
                  {isLocked && (
                    <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto text-center"
        >
          <motion.button
            onClick={() => navigate(`/training/${nextSetId}`)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-5 rounded-2xl font-black text-xl accent-gradient text-white shadow-xl animate-pulse-glow transition-all duration-200"
          >
            CONTINUE TRAINING
          </motion.button>
          <p className="mt-4 text-sm text-muted-foreground font-semibold">
            Day {nextSetId}:{" "}
            {exerciseSets.find((s) => s.id === nextSetId)?.title}
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
