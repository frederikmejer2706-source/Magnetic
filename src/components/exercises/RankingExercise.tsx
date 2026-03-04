import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Exercise } from "@/data/exercises";

interface RankingExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

const RankingExercise = ({ exercise, onComplete }: RankingExerciseProps) => {
  const [ranked, setRanked] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const items = exercise.rankItems || [];
  const isCorrect =
    JSON.stringify(ranked) === JSON.stringify(exercise.correctRanking);

  const handleSelect = (index: number) => {
    if (submitted) return;
    if (ranked.includes(index)) {
      setRanked(ranked.filter((i) => i !== index));
    } else {
      setRanked([...ranked, index]);
    }
  };

  const handleCheck = () => {
    if (ranked.length !== items.length) return;
    setSubmitted(true);
  };

  const handleContinue = () => {
    onComplete(isCorrect);
  };

  const rankPosition = (index: number) => {
    const pos = ranked.indexOf(index);
    return pos === -1 ? null : pos + 1;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {exercise.scenario && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-muted-foreground mb-3 italic"
        >
          {exercise.scenario}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg font-bold text-foreground mb-2"
      >
        {exercise.question}
      </motion.h2>

      <p className="text-sm text-muted-foreground mb-6">
        Tap items in order from most to least powerful. Tap again to deselect.
      </p>

      <div className="space-y-3 mb-8">
        {items.map((item, index) => {
          const pos = rankPosition(index);
          let borderClass = "border-border";
          let bgClass = "bg-card";

          if (submitted && exercise.correctRanking) {
            const correctPos = exercise.correctRanking.indexOf(index);
            const userPos = ranked.indexOf(index);
            if (correctPos === userPos) {
              borderClass = "border-success";
              bgClass = "bg-success/10";
            } else {
              borderClass = "border-destructive";
              bgClass = "bg-destructive/10";
            }
          } else if (pos !== null) {
            borderClass = "border-primary";
            bgClass = "bg-primary/5";
          }

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              onClick={() => handleSelect(index)}
              disabled={submitted}
              className={`w-full text-left p-4 rounded-xl border-2 ${borderClass} ${bgClass} transition-all duration-200 flex items-center gap-3 ${
                !submitted ? "cursor-pointer active:scale-[0.98]" : ""
              }`}
            >
              {pos !== null && (
                <span className="w-7 h-7 rounded-full accent-gradient flex items-center justify-center text-sm font-bold text-foreground shrink-0">
                  {pos}
                </span>
              )}
              <span className="font-semibold text-foreground">{item}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-xl mb-6 ${
              isCorrect
                ? "bg-success/10 border border-success/30"
                : "bg-destructive/10 border border-destructive/30"
            }`}
          >
            <p className="font-bold text-sm mb-1">
              {isCorrect ? "✨ Perfect order!" : "Not quite right."}
            </p>
            {!isCorrect && exercise.correctRanking && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  Correct order:
                </p>
                {exercise.correctRanking.map((itemIdx, pos) => (
                  <p key={pos} className="text-xs text-muted-foreground">
                    {pos + 1}. {items[itemIdx]}
                  </p>
                ))}
              </div>
            )}
            <p className="text-sm text-muted-foreground">{exercise.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleCheck}
          disabled={ranked.length !== items.length}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
            ranked.length === items.length
              ? "accent-gradient text-card-foreground shadow-lg active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          CHECK
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleContinue}
          className="w-full py-4 rounded-xl font-bold text-lg accent-gradient text-card-foreground shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          {isCorrect ? "LEVEL UP →" : "CONTINUE →"}
        </motion.button>
      )}
    </div>
  );
};

export default RankingExercise;
