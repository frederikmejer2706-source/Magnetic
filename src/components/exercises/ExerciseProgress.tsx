import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface ExerciseProgressProps {
  current: number;
  total: number;
  xp: number;
}

const ExerciseProgress = ({ current, total, xp }: ExerciseProgressProps) => {
  // Progress shows how much of the CURRENT set is completed.
  // When starting the first exercise, it should be at 0%.
  const progress = total > 0 ? ((current - 1) / total) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-black text-muted-foreground uppercase tracking-widest">
          Exercise {Math.min(current, total)} of {total}
        </span>
        <div className="flex items-center gap-1 bg-[#58CC02]/10 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-[#58CC02] fill-[#58CC02]" />
          <span className="text-sm font-black text-[#58CC02]">+{xp} XP</span>
        </div>
      </div>
      <div className="h-4 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-100 relative">
        <motion.div
          className="h-full rounded-full bg-[#58CC02]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ExerciseProgress;
