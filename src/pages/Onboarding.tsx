import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeSplash from "@/components/onboarding/WelcomeSplash";
import GoalPicker from "@/components/onboarding/GoalPicker";
import SelfAssessment from "@/components/onboarding/SelfAssessment";
import AccountCreation from "@/components/onboarding/AccountCreation";
import NotificationPrompt from "@/components/onboarding/NotificationPrompt";

export type OnboardingData = {
  goal: string | null;
  answers: number[];
  email: string;
  name: string;
};

const STEPS = ["welcome", "goal", "assessment", "account", "notifications"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    goal: null, answers: [], email: "", name: "",
  });

  const next = () => {
    if (step + 1 >= STEPS.length) {
      localStorage.setItem("onboarding-complete", "true");
      localStorage.setItem("onboarding-data", JSON.stringify(data));
      navigate("/");
    } else {
      setStep(s => s + 1);
    }
  };

  const updateData = (patch: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...patch }));
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {step > 0 && (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center gap-2">
          {STEPS.slice(1).map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
              i < step ? "w-6 bg-accent" : "w-6 bg-border"
            }`} />
          ))}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {step === 0 && <WelcomeSplash onNext={next} />}
          {step === 1 && <GoalPicker onNext={next} data={data} updateData={updateData} />}
          {step === 2 && <SelfAssessment onNext={next} data={data} updateData={updateData} />}
          {step === 3 && <AccountCreation onNext={next} data={data} updateData={updateData} />}
          {step === 4 && <NotificationPrompt onNext={next} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
