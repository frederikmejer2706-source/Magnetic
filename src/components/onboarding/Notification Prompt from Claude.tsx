import { useState } from "react";
import { motion } from "framer-motion";

interface Props { onNext: () => void; }

const NotificationPrompt = ({ onNext }: Props) => {
  const [asked, setAsked] = useState(false);

  const handleEnable = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(() => setAsked(true));
    } else {
      setAsked(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-20">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-xs">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
          className="w-28 h-28 rounded-full power-gradient-bg flex items-center justify-center mb-8 glow-warm"
        >
          <span className="text-5xl">🔔</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-3xl font-black text-foreground mb-4 leading-tight"
        >
          Don't break<br />your streak
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="text-muted-foreground font-medium text-lg leading-relaxed mb-8"
        >
          Get a daily nudge to keep training. People who train daily see results 3x faster.
        </motion.p>

        {asked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full p-4 rounded-2xl bg-accent/10 border border-accent/30 mb-6"
          >
            <p className="font-bold text-foreground">✅ You're all set!</p>
            <p className="text-sm text-muted-foreground mt-1">We'll send you a daily reminder.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="space-y-3 w-full text-left"
        >
          {[
            { icon: "⏰", text: "Daily 5-min training reminders" },
            { icon: "🏆", text: "Streak alerts so you never miss a day" },
            { icon: "⚡", text: "XP milestone celebrations" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-semibold text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
        className="w-full max-w-xs space-y-3"
      >
        {!asked ? (
          <>
            <motion.button
              onClick={handleEnable}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="w-full py-5 rounded-2xl font-black text-xl accent-gradient text-white shadow-xl animate-pulse-glow"
            >
              ENABLE NOTIFICATIONS
            </motion.button>
            <button onClick={onNext} className="w-full py-3 text-muted-foreground font-semibold text-sm hover:text-foreground transition-colors">
              Maybe later →
            </button>
          </>
        ) : (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="w-full py-5 rounded-2xl font-black text-xl accent-gradient text-white shadow-xl"
          >
            START TRAINING →
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default NotificationPrompt;
