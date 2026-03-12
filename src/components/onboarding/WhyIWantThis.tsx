import { useState } from "react";
import { motion } from "framer-motion";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  onNext: () => void;
  data: OnboardingData;
  updateData: (patch: Partial<OnboardingData>) => void;
}

const WhyIWantThis = ({ onNext, data, updateData }: Props) => {
  const [why, setWhy] = useState(data.why || "");

  const handleContinue = () => {
    updateData({ why });
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-sm font-bold text-[#58CC02] uppercase tracking-wider mb-2">
          Your Why
        </p>
        <h2 className="text-3xl font-black text-foreground leading-tight mb-3">
          Why do you want to become magnetic?
        </h2>
        <p className="text-muted-foreground font-medium leading-relaxed">
          Be specific. Is there a person you want to connect with? A version of yourself you want to become? A room you want to walk into differently? The clearer your reason, the stronger your motivation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 flex flex-col gap-6"
      >
        {/* Example prompts */}
        <div className="space-y-2">
          <p className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-3">
            Some examples to get you thinking:
          </p>
          {[
            "There's someone I want to connect with on a deeper level",
            "I want to walk into any room and feel at ease",
            "I want people to remember me after we meet",
            "I want to become the most interesting person in any conversation",
          ].map((example) => (
            <button
              key={example}
              onClick={() => setWhy(example)}
              className="w-full text-left px-4 py-3 rounded-xl border-2 border-border bg-card text-sm font-semibold text-muted-foreground hover:border-[#58CC02]/40 hover:text-foreground transition-all"
            >
              "{example}"
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">or write your own</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <textarea
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            placeholder="I want to become magnetic because..."
            rows={4}
            className="w-full px-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground font-semibold focus:border-[#58CC02] focus:outline-none transition-colors resize-none text-base leading-relaxed"
          />
          <p className="text-xs text-muted-foreground mt-1 text-right font-medium">
            {why.length} characters
          </p>
        </div>

        <div className="mt-auto space-y-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            disabled={!why.trim()}
            className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-200 ${
              why.trim()
                ? "bg-[#58CC02] text-white shadow-[0_6px_0_0_#46A302] active:shadow-none active:translate-y-1"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            THIS IS MY WHY →
          </motion.button>
          <button
            onClick={onNext}
            className="w-full py-3 text-muted-foreground font-semibold text-sm hover:text-foreground transition-colors"
          >
            Skip for now →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WhyIWantThis;
