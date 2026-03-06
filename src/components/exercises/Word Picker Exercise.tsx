import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Exercise } from "@/data/exercises";

interface Props {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

const WordPickerExercise = ({ exercise, onComplete }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!selected) return;
    localStorage.setItem("charisma-word", selected);
    setConfirmed(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-medium text-muted-foreground mb-3 italic"
      >
        This word becomes yours from today.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg font-bold text-foreground mb-6"
      >
        {exercise.question}
      </motion.h2>

      {/* Word grid */}
      {!confirmed && (
        <div className="grid grid-cols-2 gap-3 mb-8">
          {exercise.words?.map((word, i) => (
            <motion.button
              key={word}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => setSelected(word)}
              className={`p-4 rounded-xl border-2 font-black text-lg transition-all duration-200 active:scale-[0.97] ${
                selected === word
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {word}
            </motion.button>
          ))}
        </div>
      )}

      {/* Confirmed state — say it out loud */}
      <AnimatePresence>
        {confirmed && selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="w-32 h-32 rounded-full accent-gradient mx-auto mb-6 flex items-center justify-center glow-warm-strong">
              <span className="text-2xl font-black text-white">{selected}</span>
            </div>
            <h3 className="text-2xl font-black text-foreground mb-3">
              This is your word.
            </h3>
            <p className="text-muted-foreground font-semibold mb-6 max-w-xs mx-auto">
              Say it out loud right now. Not flat — like you mean it.
            </p>
            <div className="card-elevated p-4 text-left">
              <p className="text-sm text-muted-foreground font-medium">
                {exercise.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      {!confirmed ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleConfirm}
          disabled={!selected}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
            selected
              ? "accent-gradient text-white shadow-lg active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          THIS IS MY WORD →
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => onComplete(true)}
          className="w-full py-4 rounded-xl font-bold text-lg accent-gradient text-white shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          I SAID IT OUT LOUD →
        </motion.button>
      )}
    </div>
  );
};

export default WordPickerExercise;
