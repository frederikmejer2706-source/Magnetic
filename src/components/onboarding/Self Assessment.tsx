import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  onNext: () => void;
  data: OnboardingData;
  updateData: (patch: Partial<OnboardingData>) => void;
}

const questions = [
  {
    question: "How do you feel walking into a room full of strangers?",
    options: ["Anxious and self-conscious", "A bit nervous but okay", "Neutral, I just get on with it", "Completely comfortable"],
  },
  {
    question: "When someone challenges your opinion publicly, you usually...",
    options: ["Back down immediately", "Get flustered and defensive", "Stay calm but struggle to respond", "Handle it with ease"],
  },
  {
    question: "How often do people interrupt or talk over you?",
    options: ["All the time", "Fairly often", "Occasionally", "Rarely or never"],
  },
  {
    question: "When you speak in a group, people tend to...",
    options: ["Ignore or dismiss me", "Half-listen", "Listen but move on quickly", "Pay close attention"],
  },
  {
    question: "How would you describe your current confidence level?",
    options: ["Very low — I struggle daily", "Low — I hold back a lot", "Average — room to grow", "High — I want to level up further"],
  },
];

const SelfAssessment = ({ onNext, data, updateData }: Props) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const answers = data.answers;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    updateData({ answers: newAnswers });
    if (current + 1 >= questions.length) {
      onNext();
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const q = questions[current];

  return (
    <div className="min-h-screen flex flex-col px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <p className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Step 2 of 4</p>
        <h2 className="text-3xl font-black text-foreground leading-tight">Quick self-check</h2>
        <p className="text-muted-foreground mt-2 font-medium">Be honest — this shapes your training.</p>
      </motion.div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-bold text-muted-foreground">{current + 1} of {questions.length}</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full accent-gradient-bar"
            animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <h3 className="text-xl font-black text-foreground mb-6 leading-snug">{q.question}</h3>
          <div className="space-y-3">
            {q.options.map((option, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelected(i)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selected === i
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <span className="font-semibold text-foreground">{option}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8">
        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-200 ${
            selected !== null
              ? "accent-gradient text-white shadow-xl active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {current + 1 === questions.length ? "SEE MY RESULTS →" : "NEXT →"}
        </button>
      </motion.div>
    </div>
  );
};

export default SelfAssessment;
