import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExerciseCompleteProps {
  setTitle: string;
  xpEarned: number;
  correctCount: number;
  totalCount: number;
}

const ExerciseComplete = ({
  setTitle,
  xpEarned,
  correctCount,
  totalCount,
}: ExerciseCompleteProps) => {
  const navigate = useNavigate();
  const percentage = Math.round((correctCount / totalCount) * 100);
  const isPassed = percentage >= 50;

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mb-8 flex justify-center">
          {isPassed ? (
            <div className="w-24 h-24 bg-[#58CC02] rounded-full flex items-center justify-center shadow-[0_8px_0_0_#46A302]">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          ) : (
            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-[0_8px_0_0_#b91c1c]">
              <XCircle className="w-12 h-12 text-white" />
            </div>
          )}
        </div>

        <h1 className="text-4xl font-black text-foreground mb-2">
          {isPassed ? "Day Complete!" : "Keep Practicing!"}
        </h1>
        <p className="text-xl text-muted-foreground font-bold mb-8">
          {setTitle}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-6 border-b-4 border-gray-100 rounded-2xl">
            <div className="flex flex-col items-center">
              <Star className="w-6 h-6 text-[#58CC02] mb-2 fill-[#58CC02]" />
              <span className="text-2xl font-black text-foreground">+{xpEarned}</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">XP Earned</span>
            </div>
          </Card>
          <Card className="p-6 border-b-4 border-gray-100 rounded-2xl">
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-2xl font-black text-foreground">{percentage}%</span>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Accuracy</span>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => navigate("/")}
            className="w-full py-8 rounded-2xl font-black text-2xl bg-[#58CC02] hover:bg-[#46A302] text-white shadow-[0_8px_0_0_#46A302] active:translate-y-1 active:shadow-none transition-all"
          >
            {isPassed ? "CONTINUE TO ROADMAP" : "RETRY EXERCISES"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExerciseComplete;
