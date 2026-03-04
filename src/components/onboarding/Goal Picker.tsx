import { motion } from "framer-motion";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  onNext: () => void;
  data: OnboardingData;
  updateData: (patch: Partial<OnboardingData>) => void;
}

const goals = [
  {
    id: "confidence",
    icon: "🦁",
    title: "Build Confidence",
    subtitle: "Stop second-guessing yourself and own every room you walk into.",
    color: "from-orange-400 to-orange-600",
  },
  {
    id: "social-power",
    icon: "🕊️",
    title: "Social Power",
    subtitle: "Master reading people, influence conversations, command respect.",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "leadership",
    icon: "👑",
    title: "Leadership",
    subtitle: "Inspire teams, speak with authority, make people want to follow you.",
    color: "from-purple-400 to-purple-600",
  },
];

const GoalPicker = ({ onNext, data, updateData }: Props) => {
  const select = (id: string) => {
    updateData({ goal: id });
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Step 1 of 4</p>
        <h2 className="text-3xl font-black text-foreground leading-tight">What's your<br />main goal?</h2>
        <p className="text-muted-foreground mt-2 font-medium">We'll personalise your training path.</p>
      </motion.div>

      <div className="flex-1 space-y-4">
        {goals.map((goal, i) => (
          <motion.button
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => select(goal.id)}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
              data.goal === goal.id
                ? "border-accent bg-accent/10 shadow-lg"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center shrink-0 shadow-md`}>
              <span className="text-2xl">{goal.icon}</span>
            </div>
            <div>
              <h3 className="font-black text-foreground text-lg">{goal.title}</h3>
              <p className="text-sm text-muted-foreground font-medium leading-snug">{goal.subtitle}</p>
            </div>
            {data.goal === goal.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto w-6 h-6 rounded-full accent-gradient flex items-center justify-center shrink-0"
              >
                <span className="text-white text-xs font-black">✓</span>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
        <button
          onClick={onNext}
          disabled={!data.goal}
          className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-200 ${
            data.goal
              ? "accent-gradient text-white shadow-xl active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          CONTINUE →
        </button>
      </motion.div>
    </div>
  );
};

export default GoalPicker;
