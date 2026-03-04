import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Exercise } from "@/data/exercises";

interface ScoringExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

const ScoringExercise = ({ exercise, onComplete }: ScoringExerciseProps) => {
  const [score, setScore] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const range = exercise.scoringCorrectRange || [5, 5];
  const isCorrect = score >= range[0] && score <= range[1];

  const handleCheck = () => {
    setSubmitted(true);
  };

  const handleContinue = () => {
    onComplete(isCorrect);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-bold text-foreground mb-8 whitespace-pre-line"
      >
        {exercise.question}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex justify-between mb-2">
          <span className="text-xs font-semibold text-muted-foreground">Weak</span>
          <span className="text-xs font-semibold text-muted-foreground">Powerful</span>
        </div>

        <div className="relative">
          <input
            type="range"
            min={1}
            max={10}
            value={score}
            onChange={(e) => !submitted && setScore(Number(e.target.value))}
            disabled={submitted}
            className="w-full h-3 rounded-full appearance-none cursor-pointer bg-secondary
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-card
              [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-4
              [&::-moz-range-thumb]:border-card"
          />
          <div className="flex justify-between mt-1 px-1">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`text-xs font-bold ${
                  submitted && i + 1 >= range[0] && i + 1 <= range[1]
                    ? "text-success"
                    : "text-muted-foreground/50"
                }`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <span className="text-4xl font-black text-foreground">{score}</span>
          <span className="text-lg text-muted-foreground font-semibold"> / 10</span>
        </div>
      </motion.div>

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
              {isCorrect
                ? "✨ Spot on!"
                : `The correct range is ${range[0]}–${range[1]}.`}
            </p>
            <p className="text-sm text-muted-foreground">{exercise.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleCheck}
          className="w-full py-4 rounded-xl font-bold text-lg accent-gradient text-card-foreground shadow-lg active:scale-[0.98] transition-all duration-200"
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

export default ScoringExercise;
