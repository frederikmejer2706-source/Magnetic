import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, RotateCcw, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
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

const vibeEmojis: Record<string, string> = {
  fire: "🔥",
  cool: "😎",
  warm: "☀️",
  meh: "😐",
  icy: "🥶",
};

const vibeLabels: Record<string, string> = {
  fire: "On Fire!",
  cool: "Smooth Operator",
  warm: "Friendly Vibes",
  meh: "Needs Spice",
  icy: "Too Cold",
};

export default function CharismaExercise() {
  const [question] = useState(
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
      const { data, error } = await supabase.functions.invoke("judge-answer", {
        body: { boringQuestion: question, userAnswer: answer },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

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
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-lg text-foreground tracking-tight">
              CharismaPro
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            Playful Answers
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-6">
          {/* Task Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-card rounded-2xl shadow-card p-8 space-y-6 border border-border">
              {/* Task label */}
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  Challenge
                </span>
              </div>

              {/* Instruction */}
              <p className="text-muted-foreground text-base font-semibold">
                Someone just asked you the most boring question ever. Your mission: make your answer so playful they can't help but smile. ✨
              </p>

              {/* The boring question */}
              <div className="bg-muted rounded-xl p-5 border-l-4 border-primary">
                <p className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-wide">
                  They said:
                </p>
                <p className="text-xl font-extrabold text-foreground">
                  "{question}"
                </p>
              </div>

              {/* Answer area */}
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
                      className="min-h-[120px] text-base font-semibold rounded-xl border-2 border-border focus:border-primary transition-colors resize-none"
                      disabled={isJudging}
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={!answer.trim() || isJudging}
                      className="w-full h-14 text-base font-extrabold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-all disabled:opacity-40"
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
                    {/* Your answer recap */}
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wide">
                        Your answer:
                      </p>
                      <p className="text-base font-semibold text-foreground italic">
                        "{answer}"
                      </p>
                    </div>

                    {/* Score + Vibe */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
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
                                  ? "fill-accent text-accent"
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
                      >
                        <span className="text-2xl">{vibeEmojis[judgment.vibe]}</span>
                        <span className="font-extrabold text-sm text-foreground">
                          {vibeLabels[judgment.vibe]}
                        </span>
                      </motion.div>
                    </div>

                    {/* Feedback */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-card rounded-xl border border-border p-5 space-y-3"
                    >
                      <p className="text-base font-semibold text-foreground">
                        {judgment.feedback}
                      </p>
                      {judgment.tip && (
                        <div className="flex items-start gap-2 bg-accent/10 rounded-lg p-3">
                          <Sparkles className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <p className="text-sm font-semibold text-accent-foreground">
                            <span className="font-extrabold">Pro tip:</span>{" "}
                            {judgment.tip}
                          </p>
                        </div>
                      )}
                    </motion.div>

                    {/* Try again */}
                    <Button
                      onClick={handleTryAgain}
                      className="w-full h-14 text-base font-extrabold rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg"
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
      </main>
    </div>
  );
}
