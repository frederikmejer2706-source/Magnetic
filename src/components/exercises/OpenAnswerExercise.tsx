import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Star } from "lucide-react";
import type { Exercise } from "@/data/exercises";

interface OpenAnswerExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

interface JudgmentResult {
  correct: boolean;
  score: number;
  feedback: string;
  keyPoint: string;
}

const ScoreStars = ({ score }: { score: number }) => {
  return (
    <div className="flex gap-1" data-testid="score-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-5 h-5 ${s <= score ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
};

const OpenAnswerExercise = ({ exercise, onComplete }: OpenAnswerExerciseProps) => {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [judging, setJudging] = useState(false);
  const [judgment, setJudgment] = useState<JudgmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (answer.trim().length === 0) return;
    setJudging(true);
    setError(null);

    try {
      const response = await fetch("/api/judge-open-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: exercise.question,
          expectedInsight: exercise.explanation,
          userAnswer: answer.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get judgment");
      }

      const result: JudgmentResult = await response.json();
      setJudgment(result);
      setSubmitted(true);
    } catch (err) {
      setError("Couldn't reach the AI coach. You can try again or skip ahead.");
      setSubmitted(true);
      setJudgment(null);
    } finally {
      setJudging(false);
    }
  };

  const handleContinue = () => {
    onComplete(judgment?.correct ?? true);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setJudgment(null);
    setError(null);
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <textarea
          value={answer}
          onChange={(e) => !submitted && setAnswer(e.target.value)}
          disabled={submitted || judging}
          placeholder="Type your answer here..."
          data-testid="input-open-answer"
          className="w-full min-h-[140px] p-4 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
        />
      </motion.div>

      <AnimatePresence>
        {judging && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl mb-6 bg-primary/10 border border-primary/30"
          >
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <p className="text-sm font-medium text-foreground">AI coach is reviewing your answer...</p>
          </motion.div>
        )}

        {submitted && judgment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-xl mb-6 ${
              judgment.correct
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-destructive/10 border border-destructive/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {judgment.correct ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <p className="font-bold text-sm" data-testid="text-judgment-result">
                  {judgment.score >= 5 ? "Excellent!" :
                   judgment.score >= 4 ? "Great understanding!" :
                   judgment.score >= 3 ? "On the right track" :
                   judgment.score >= 2 ? "Getting there" :
                   "Not quite"}
                </p>
              </div>
              <ScoreStars score={Math.max(1, Math.min(5, judgment.score || 3))} />
            </div>
            <p className="text-sm text-muted-foreground mb-3" data-testid="text-judgment-feedback">{judgment.feedback}</p>
            <div className="pt-3 border-t border-border/50">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Key Takeaway</p>
              <p className="text-sm text-foreground" data-testid="text-judgment-keypoint">{judgment.keyPoint}</p>
            </div>
          </motion.div>
        )}

        {submitted && error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-xl mb-6 bg-primary/10 border border-primary/30"
          >
            <p className="font-bold text-sm mb-1">Key Insight</p>
            <p className="text-sm text-muted-foreground">{exercise.explanation}</p>
            <p className="text-xs text-muted-foreground/70 mt-2 italic">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && !judging ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleCheck}
          disabled={answer.trim().length === 0}
          data-testid="button-submit-answer"
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
            answer.trim().length > 0
              ? "accent-gradient text-card-foreground shadow-lg active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          SUBMIT
        </motion.button>
      ) : judging ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          disabled
          className="w-full py-4 rounded-xl font-bold text-lg bg-muted text-muted-foreground cursor-not-allowed"
        >
          JUDGING...
        </motion.button>
      ) : (
        <div className="flex gap-3">
          {judgment && !judgment.correct && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleRetry}
              data-testid="button-retry-answer"
              className="flex-1 py-4 rounded-xl font-bold text-lg border-2 border-border text-foreground active:scale-[0.98] transition-all duration-200"
            >
              TRY AGAIN
            </motion.button>
          )}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleContinue}
            data-testid="button-continue"
            className="flex-1 py-4 rounded-xl font-bold text-lg accent-gradient text-card-foreground shadow-lg active:scale-[0.98] transition-all duration-200"
          >
            CONTINUE
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default OpenAnswerExercise;
