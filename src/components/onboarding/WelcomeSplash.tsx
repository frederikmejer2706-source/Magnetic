import { motion } from "framer-motion";

interface Props { onNext: () => void; }

const WelcomeSplash = ({ onNext }: Props) => {
  return (
    <div className="min-h-screen power-gradient-bg flex flex-col items-center justify-between px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5 animate-breathe" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full accent-gradient flex items-center justify-center mb-8 glow-warm"
        >
          <span className="text-5xl">⚡</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-black text-white mb-4 leading-tight"
        >
          THE CHARISMA<br />APP
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-white/70 text-lg font-semibold mb-6 max-w-xs"
        >
          Train the invisible skills that make people stop, listen, and follow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 text-left max-w-xs w-full"
        >
          {[
            { icon: "🧠", text: "Science-backed exercises" },
            { icon: "🎯", text: "Personalised to your goal" },
            { icon: "⚡", text: "5 minutes a day" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + i * 0.1 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-white/90 font-semibold">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="w-full max-w-xs z-10"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-5 rounded-2xl font-black text-xl accent-gradient text-white shadow-xl animate-pulse-glow"
        >
          GET STARTED →
        </motion.button>
        <p className="text-white/40 text-xs text-center mt-4 font-medium">Free forever. No credit card needed.</p>
      </motion.div>
    </div>
  );
};

export default WelcomeSplash;
