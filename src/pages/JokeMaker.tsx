import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, RotateCcw, Star, Flame, Snowflake, Sun, ThermometerSun, Meh } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const BORING_QUESTIONS = [
  "So, what do you do for a living?",
  "How was your weekend?",
  "Where are you from?",
  "What's your favorite food?",
  "Do you have any hobbies?",
  "How's the weather out there?",
  "Did you watch anything good lately?",
];

type Judgment = {
  score: number;
  feedback: string;
  tip: string;
  vibe: "fire" | "cool" | "warm" | "meh" | "icy";
};

const vibeIcons: Record<string, typeof Flame> = {
  fire: Flame,
  cool: ThermometerSun,
  warm: Sun,
  meh: Meh,
  icy: Snowflake,
};

const vibeColors: Record<string, string> = {
  fire: "text-orange-500",
  cool: "text-blue-400",
  warm: "text-yellow-500",
  meh: "text-gray-400",
  icy: "text-cyan-400",
};

const vibeLabels: Record<string, string> = {
  fire: "On Fire!",
  cool: "Smooth Operator",
  warm: "Friendly Vibes",
  meh: "Needs Spice",
  icy: "Too Cold",
};

export default function JokeMaker() {
  const [question, setQuestion] = useState(
    () => BORING_QUESTIONS[Math.floor(Math.random() * BORING_QUESTIONS.length)]
  );
  const [answer, setAnswer] = useState("");
  const [isJudging, setIsJudging] = useState(false);
  const [judgment, setJudgment] = useState<Judgment | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setIsJudging(true);
    setJudgment(null);

    try {
      const response = await fetch("/api/judge-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boringQuestion: question, userAnswer: answer }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Something went wrong");
      }

      const data = await response.json();
      setJudgment(data as Judgment);
    } catch (e: any) {
      console.error(e);
      toast({
        title: "Oops!",
        description: e.message || "Something went wrong. Try again!",
        variant: "destructive",
      });
    } finally {
      setIsJudging(false);
    }
  };

  const handleTryAgain = () => {
    setAnswer("");
    setJudgment(null);
    setQuestion(BORING_QUESTIONS[Math.floor(Math.random() * BORING_QUESTIONS.length)]);
  };

  const VibeIcon = judgment ? vibeIcons[judgment.vibe] || Meh : Meh;

  return (
    <div className="flex flex-col items-center px-4 py-8" data-testid="page-joke-maker">
      <div className="w-full max-w-2xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-card rounded-md shadow-sm p-6 md:p-8 space-y-6 border border-border">
            <div className="flex items-center gap-2">
              <span className="bg-[#FF9F43]/10 text-[#FF9F43] text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full" data-testid="badge-challenge">
                Challenge
              </span>
            </div>

            <p className="text-muted-foreground text-base font-semibold">
              Someone just asked you the most boring question ever. Your mission: make your answer so playful they can't help but smile.
            </p>

            <div className="bg-muted rounded-md p-5 border-l-4 border-[#FF9F43]">
              <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wide">
                They said:
              </p>
              <p className="text-xl font-extrabold text-foreground" data-testid="text-boring-question">
                "{question}"
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!judgment ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <Textarea
                    placeholder="Type your most charming answer..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[120px] text-base font-semibold rounded-md border-2 border-border focus:border-[#FF9F43] transition-colors resize-none"
                    disabled={isJudging}
                    data-testid="input-answer"
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={!answer.trim() || isJudging}
                    size="lg"
                    className="w-full font-extrabold bg-[#FF9F43] text-white border-[#FF9F43] disabled:opacity-40"
                    data-testid="button-submit-answer"
                  >
                    {isJudging ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="mr-2"
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isJudging ? "Judging your charm..." : "Submit Answer"}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="space-y-5"
                >
                  <div className="bg-muted/50 rounded-md p-4">
                    <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wide">
                      Your answer:
                    </p>
                    <p className="text-base font-semibold text-foreground italic" data-testid="text-user-answer">
                      "{answer}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-1" data-testid="display-score">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: star * 0.1 }}
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= judgment.score
                                ? "fill-[#FFD93D] text-[#FFD93D]"
                                : "text-border"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-2 bg-muted rounded-full px-4 py-2"
                      data-testid="display-vibe"
                    >
                      <VibeIcon className={`w-6 h-6 ${vibeColors[judgment.vibe]}`} />
                      <span className="font-extrabold text-sm text-foreground">
                        {vibeLabels[judgment.vibe]}
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-card rounded-md border border-border p-5 space-y-3"
                  >
                    <p className="text-base font-semibold text-foreground" data-testid="text-feedback">
                      {judgment.feedback}
                    </p>
                    {judgment.tip && (
                      <div className="flex items-start gap-2 bg-[#FF9F43]/10 rounded-md p-3">
                        <Sparkles className="w-4 h-4 text-[#FF9F43] mt-0.5 shrink-0" />
                        <p className="text-sm font-semibold text-foreground" data-testid="text-pro-tip">
                          <span className="font-extrabold">Pro tip:</span>{" "}
                          {judgment.tip}
                        </p>
                      </div>
                    )}
                  </motion.div>

                  <Button
                    onClick={handleTryAgain}
                    variant="secondary"
                    size="lg"
                    className="w-full font-extrabold"
                    data-testid="button-try-again"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Try Again
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
