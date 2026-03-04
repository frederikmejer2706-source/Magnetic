import { motion } from "framer-motion";

interface ExerciseProgressProps {
  current: number;
  total: number;
  xp: number;
}

const ExerciseProgress = ({ current, total, xp }: ExerciseProgressProps) => {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-muted-foreground">
          {current} / {total}
        </span>
        <span className="text-sm font-bold text-accent">+{xp} XP</span>
      </div>
      <div className="h-3 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full accent-gradient-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ExerciseProgress;
