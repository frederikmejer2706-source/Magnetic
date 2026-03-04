import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import type { Exercise } from "@/data/exercises";

interface TimedExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

const TimedExercise = ({ exercise, onComplete }: TimedExerciseProps) => {
  const timeLimit = exercise.timeLimit || 20;
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [started, setStarted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const completedRef = useRef(false);
  const autoCompleteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft <= 0) {
      setSubmitted(true);
      setTimedOut(true);
      autoCompleteTimerRef.current = setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete(true);
        }
      }, 3000);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft, onComplete]);

  useEffect(() => {
    return () => {
      if (autoCompleteTimerRef.current) clearTimeout(autoCompleteTimerRef.current);
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleCheck = () => {
    if (answer.trim().length === 0) return;
    setSubmitted(true);
  };

  const handleContinue = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (autoCompleteTimerRef.current) clearTimeout(autoCompleteTimerRef.current);
    onComplete(true);
  };

  const timerColor = timeLeft <= 5 ? "text-destructive" : timeLeft <= 10 ? "text-yellow-500" : "text-accent";
  const timerBarWidth = (timeLeft / timeLimit) * 100;

  if (!started) {
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-card border-2 border-border rounded-2xl px-6 py-4">
            <Clock className="w-6 h-6 text-accent" />
            <span className="text-2xl font-black text-foreground">{timeLimit}s</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">You'll have {timeLimit} seconds to respond</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleStart}
          data-testid="button-start-timer"
          className="w-full py-4 rounded-xl font-bold text-lg accent-gradient text-card-foreground shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          START
        </motion.button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className={`w-5 h-5 ${timerColor}`} />
          <span className={`text-xl font-black ${timerColor}`}>{timeLeft}s</span>
        </div>
      </div>

      <div className="h-2 rounded-full bg-secondary overflow-hidden mb-6">
        <motion.div
          className={`h-full rounded-full ${timeLeft <= 5 ? "bg-destructive" : timeLeft <= 10 ? "bg-yellow-500" : "bg-accent"}`}
          animate={{ width: `${timerBarWidth}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-bold text-foreground mb-6 whitespace-pre-line"
      >
        {exercise.question}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <textarea
          ref={textareaRef}
          value={answer}
          onChange={(e) => !submitted && setAnswer(e.target.value)}
          disabled={submitted}
          placeholder="Type your response quickly..."
          data-testid="input-timed-answer"
          className="w-full min-h-[120px] p-4 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
        />
      </motion.div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-xl mb-6 bg-primary/10 border border-primary/30"
          >
            <p className="font-bold text-sm mb-1">
              {timedOut ? "Time's up! Moving on shortly..." : "Response submitted"}
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
          disabled={answer.trim().length === 0}
          data-testid="button-submit-timed"
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
            answer.trim().length > 0
              ? "accent-gradient text-card-foreground shadow-lg active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          SUBMIT
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleContinue}
          data-testid="button-continue-timed"
          className="w-full py-4 rounded-xl font-bold text-lg accent-gradient text-card-foreground shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          CONTINUE →
        </motion.button>
      )}
    </div>
  );
};

export default TimedExercise;
