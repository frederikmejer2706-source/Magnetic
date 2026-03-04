import { useState } from "react";
import { motion } from "framer-motion";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  onNext: () => void;
  data: OnboardingData;
  updateData: (patch: Partial<OnboardingData>) => void;
}

const AccountCreation = ({ onNext, data, updateData }: Props) => {
  const [mode, setMode] = useState<"options" | "email">("options");
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState("");

  const handleEmailSignup = () => {
    if (!name || !email || !password) return;
    updateData({ name, email });
    onNext();
  };

  const handleSocial = (provider: string) => {
    updateData({ name: `${provider} User`, email: `user@${provider.toLowerCase()}.com` });
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Step 3 of 4</p>
        <h2 className="text-3xl font-black text-foreground leading-tight">Save your<br />progress</h2>
        <p className="text-muted-foreground mt-2 font-medium">Create a free account to track your XP and levels.</p>
      </motion.div>

      {mode === "options" ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col gap-4">
          <motion.button
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            onClick={() => handleSocial("Google")}
            className="w-full py-4 rounded-2xl border-2 border-border bg-card font-bold text-foreground text-lg flex items-center justify-center gap-3 hover:border-primary/40 transition-all active:scale-[0.98]"
          >
            <span className="text-2xl">🟠</span> Continue with Google
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            onClick={() => handleSocial("Apple")}
            className="w-full py-4 rounded-2xl border-2 border-border bg-card font-bold text-foreground text-lg flex items-center justify-center gap-3 hover:border-primary/40 transition-all active:scale-[0.98]"
          >
            <span className="text-2xl">🍎</span> Continue with Apple
          </motion.button>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground font-semibold">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <motion.button
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            onClick={() => setMode("email")}
            className="w-full py-4 rounded-2xl accent-gradient text-white font-black text-lg shadow-lg active:scale-[0.98] transition-all"
          >
            Sign up with Email
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            onClick={onNext}
            className="w-full py-3 text-muted-foreground font-semibold text-sm hover:text-foreground transition-colors"
          >
            Skip for now →
          </motion.button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col gap-4">
          <input
            type="text" placeholder="Your name" value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground font-semibold focus:border-accent focus:outline-none transition-colors"
          />
          <input
            type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground font-semibold focus:border-accent focus:outline-none transition-colors"
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-4 rounded-2xl border-2 border-border bg-card text-foreground font-semibold focus:border-accent focus:outline-none transition-colors"
          />

          <button
            onClick={handleEmailSignup}
            disabled={!name || !email || !password}
            className={`w-full py-5 rounded-2xl font-black text-xl mt-2 transition-all duration-200 ${
              name && email && password
                ? "accent-gradient text-white shadow-xl active:scale-[0.98]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            CREATE ACCOUNT →
          </button>

          <button onClick={() => setMode("options")} className="text-sm text-muted-foreground font-semibold text-center hover:text-foreground transition-colors">
            ← Back to options
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AccountCreation;
