import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Exercise } from "@/data/exercises";

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

const MultipleChoiceExercise = ({ exercise, onComplete }: MultipleChoiceExerciseProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === exercise.correctAnswer;

  const handleSelect = (index: number) => {
    if (submitted) return;
    setSelected(index);
  };

  const handleCheck = () => {
    if (selected === null) return;
    setSubmitted(true);
  };

  const handleContinue = () => {
    onComplete(isCorrect);
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
        className="text-lg font-bold text-foreground mb-6 whitespace-pre-line"
      >
        {exercise.question}
      </motion.h2>

      <div className="space-y-3 mb-8">
        {exercise.options?.map((option, index) => {
          let borderClass = "border-border hover:border-primary/50";
          let bgClass = "bg-card";

          if (submitted) {
            if (index === exercise.correctAnswer) {
              borderClass = "border-success";
              bgClass = "bg-success/10";
            } else if (index === selected && !isCorrect) {
              borderClass = "border-destructive";
              bgClass = "bg-destructive/10";
            }
          } else if (index === selected) {
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
              className={`w-full text-left p-4 rounded-xl border-2 ${borderClass} ${bgClass} transition-all duration-200 ${
                !submitted ? "cursor-pointer active:scale-[0.98]" : ""
              }`}
            >
              <span className="font-semibold text-foreground">{option}</span>
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
              {isCorrect ? "✨ Correct!" : "Not quite."}
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
          disabled={selected === null}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
            selected !== null
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

export default MultipleChoiceExercise;
