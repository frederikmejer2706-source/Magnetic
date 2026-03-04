import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Exercise } from "@/data/exercises";

interface MatchingExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

const MatchingExercise = ({ exercise, onComplete }: MatchingExerciseProps) => {
  const pairs = exercise.matchPairs || [];
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const shuffledRightIndices = useState(() => {
    const indices = pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  })[0];

  const handleLeftClick = (index: number) => {
    if (submitted) return;
    setSelectedLeft(selectedLeft === index ? null : index);
  };

  const handleRightClick = (rightIndex: number) => {
    if (submitted || selectedLeft === null) return;
    const newMatches = { ...matches };
    Object.keys(newMatches).forEach((key) => {
      if (newMatches[Number(key)] === rightIndex) {
        delete newMatches[Number(key)];
      }
    });
    newMatches[selectedLeft] = rightIndex;
    setMatches(newMatches);
    setSelectedLeft(null);
  };

  const isCorrect = pairs.every((_, i) => matches[i] === i);
  const allMatched = Object.keys(matches).length === pairs.length;

  const handleCheck = () => {
    if (!allMatched) return;
    setSubmitted(true);
  };

  const handleContinue = () => {
    onComplete(isCorrect);
  };

  const getMatchedRight = (rightIndex: number): number | null => {
    const entry = Object.entries(matches).find(([_, v]) => v === rightIndex);
    return entry ? Number(entry[0]) : null;
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
        Tap an item on the left, then tap its match on the right.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="space-y-2">
          {pairs.map((pair, index) => {
            const isSelected = selectedLeft === index;
            const isMatched = matches[index] !== undefined;
            let borderClass = "border-border";
            let bgClass = "bg-card";

            if (submitted) {
              if (matches[index] === index) {
                borderClass = "border-success";
                bgClass = "bg-success/10";
              } else {
                borderClass = "border-destructive";
                bgClass = "bg-destructive/10";
              }
            } else if (isSelected) {
              borderClass = "border-primary";
              bgClass = "bg-primary/5";
            } else if (isMatched) {
              borderClass = "border-accent";
              bgClass = "bg-accent/5";
            }

            return (
              <motion.button
                key={`left-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => handleLeftClick(index)}
                disabled={submitted}
                className={`w-full text-left p-3 rounded-xl border-2 ${borderClass} ${bgClass} transition-all duration-200 text-sm font-semibold text-foreground ${
                  !submitted ? "cursor-pointer active:scale-[0.98]" : ""
                }`}
              >
                {pair.left}
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-2">
          {shuffledRightIndices.map((rightIndex) => {
            const matchedLeftIndex = getMatchedRight(rightIndex);
            let borderClass = "border-border";
            let bgClass = "bg-card";

            if (submitted) {
              if (matchedLeftIndex === rightIndex) {
                borderClass = "border-success";
                bgClass = "bg-success/10";
              } else {
                borderClass = "border-destructive";
                bgClass = "bg-destructive/10";
              }
            } else if (matchedLeftIndex !== null) {
              borderClass = "border-accent";
              bgClass = "bg-accent/5";
            }

            return (
              <motion.button
                key={`right-${rightIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + rightIndex * 0.05 }}
                onClick={() => handleRightClick(rightIndex)}
                disabled={submitted}
                className={`w-full text-left p-3 rounded-xl border-2 ${borderClass} ${bgClass} transition-all duration-200 text-sm font-semibold text-foreground ${
                  !submitted && selectedLeft !== null ? "cursor-pointer active:scale-[0.98]" : ""
                }`}
              >
                {pairs[rightIndex].right}
              </motion.button>
            );
          })}
        </div>
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
              {isCorrect ? "Perfect matches!" : "Not quite right."}
            </p>
            {!isCorrect && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Correct matches:</p>
                {pairs.map((pair, i) => (
                  <p key={i} className="text-xs text-muted-foreground">
                    {pair.left} → {pair.right}
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
          disabled={!allMatched}
          data-testid="button-check-matching"
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
            allMatched
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
          data-testid="button-continue-matching"
          className="w-full py-4 rounded-xl font-bold text-lg accent-gradient text-card-foreground shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          {isCorrect ? "LEVEL UP →" : "CONTINUE →"}
        </motion.button>
      )}
    </div>
  );
};

export default MatchingExercise;
