import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, RotateCcw, Home, Target, ChevronRight } from "lucide-react";

interface ExerciseCompleteProps {
  setTitle: string;
  xpEarned: number;
  correctCount: number;
  totalCount: number;
  status: "passed" | "failed";
  isDailyTry?: boolean;
  mission?: string;
}

const ExerciseComplete = ({
  setTitle,
  xpEarned,
  correctCount,
  totalCount,
  status,
  isDailyTry,
  mission,
}: ExerciseCompleteProps) => {
  const navigate = useNavigate();
  const percentage = Math.round((correctCount / totalCount) * 100);
  const passed = status === "passed";
  const [showMission, setShowMission] = useState(false);

  // Stats screen
  if (!showMission) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-auto text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl ${
            passed
              ? "bg-accent text-accent-foreground"
              : "bg-destructive text-destructive-foreground"
          }`}
        >
          {passed ? (
            <CheckCircle2 className="w-12 h-12" />
          ) : (
            <XCircle className="w-12 h-12" />
          )}
        </motion.div>

        <motion.h2 className="text-3xl font-black text-foreground mb-2">
          {passed ? "Day Complete!" : "Try Again!"}
        </motion.h2>

        <motion.p className="text-muted-foreground font-bold mb-8">
          {passed ? "You're becoming more magnetic every day." : setTitle}
        </motion.p>

        {isDailyTry && !passed && (
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-2xl mb-8">
            <p className="text-sm font-bold text-destructive">
              You must get ALL questions correct to unlock a level via Daily
              Challenge.
            </p>
          </div>
        )}

        <motion.div className="card-elevated p-6 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p
                className={`text-2xl font-black ${
                  passed ? "text-accent" : "text-destructive"
                }`}
              >
                {percentage}%
              </p>
              <p className="text-xs text-muted-foreground font-semibold">
                Accuracy
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary">+{xpEarned}</p>
              <p className="text-xs text-muted-foreground font-semibold">
                XP Earned
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-foreground">
                {correctCount}/{totalCount}
              </p>
              <p className="text-xs text-muted-foreground font-semibold">
                Correct
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-3">
          {!passed && (
            <motion.button
              onClick={() => window.location.reload()}
              className="w-full py-4 rounded-2xl font-bold text-lg bg-primary text-primary-foreground shadow-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> RETRY
            </motion.button>
          )}

          {passed && mission ? (
            <motion.button
              onClick={() => setShowMission(true)}
              className="w-full py-4 rounded-2xl font-black text-lg bg-[#58CC02] text-white shadow-[0_4px_0_0_#46A302] flex items-center justify-center gap-2"
            >
              <Target className="w-5 h-5" /> YOUR MISSION
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate("/")}
              className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 ${
                passed
                  ? "bg-[#58CC02] text-white shadow-[0_4px_0_0_#46A302]"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <Home className="w-5 h-5" />{" "}
              {passed ? "CONTINUE" : "BACK TO PATH"}
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  // Mission screen
  return (
    <AnimatePresence>
      <motion.div
        key="mission"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className="w-full max-w-md mx-auto text-center py-12"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl bg-[#58CC02] text-white"
        >
          <Target className="w-12 h-12" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black text-foreground mb-1"
        >
          Today's Mission
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-sm font-bold text-[#58CC02] uppercase tracking-wider mb-8"
        >
          Go do this in the real world
        </motion.p>

        {/* Mission text card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-card border-2 border-[#58CC02]/30 rounded-3xl p-6 mb-8 text-left shadow-lg"
        >
          <p className="text-base font-semibold text-foreground leading-relaxed">
            {mission}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate("/")}
          className="w-full py-4 rounded-2xl font-black text-lg bg-[#58CC02] text-white shadow-[0_4px_0_0_#46A302] flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" /> BACK TO PATH
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExerciseComplete;
