import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { exerciseSets } from "@/data/exercises";
import { useProgress } from "@/hooks/useProgress";
import ExerciseProgress from "@/components/exercises/ExerciseProgress";
import MultipleChoiceExercise from "@/components/exercises/MultipleChoiceExercise";
import RankingExercise from "@/components/exercises/RankingExercise";
import ScoringExercise from "@/components/exercises/ScoringExercise";
import OpenAnswerExercise from "@/components/exercises/OpenAnswerExercise";
import TimedExercise from "@/components/exercises/TimedExercise";
import MatchingExercise from "@/components/exercises/MatchingExercise";
import ExerciseComplete from "@/components/exercises/ExerciseComplete";
import { ArrowLeft, XCircle, Lock } from "lucide-react";

const Training = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addXp, completeSet, recordDailyTry } = useProgress();

  const isDailyTry = new URLSearchParams(location.search).get("mode") === "daily";
  const setIndex = parseInt(setId || "1", 10);
  const exerciseSet = exerciseSets.find((s) => s.id === setIndex);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [status, setStatus] = useState<"playing" | "passed" | "failed">("playing");

  const MAX_WRONG = 3;
  const exercises = exerciseSet?.exercises || [];
  const currentExercise = exercises[currentExerciseIndex];

  const handleComplete = (correct: boolean) => {
    const xp = correct ? 10 : 0;
    setXpEarned((prev) => prev + xp);
    
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    } else {
      const newWrong = wrongCount + 1;
      setWrongCount(newWrong);
      if (newWrong >= MAX_WRONG) {
        setStatus("failed");
        return;
      }
    }

    if (xp > 0) addXp(xp);

    if (currentExerciseIndex + 1 >= exercises.length) {
      // For daily try, must get ALL right to advance
      if (isDailyTry) {
        if (wrongCount === 0 && correct) {
          completeSet(setIndex);
          recordDailyTry();
          setStatus("passed");
        } else {
          recordDailyTry();
          setStatus("failed");
        }
      } else {
        completeSet(setIndex);
        setStatus("passed");
      }
    } else {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  };

  if (!exerciseSet || exercises.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-bold text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground mb-6">This level doesn't have exercises yet.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl font-bold accent-gradient text-card-foreground"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (status !== "playing") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <ExerciseComplete
          setTitle={exerciseSet.title}
          xpEarned={xpEarned}
          correctCount={correctCount}
          totalCount={exercises.length}
          status={status}
          isDailyTry={isDailyTry}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                {isDailyTry ? "Daily Challenge" : `Set ${setIndex}`}
              </h1>
              <p className="text-lg font-bold text-foreground">
                {exerciseSet.title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {[...Array(MAX_WRONG)].map((_, i) => (
              <XCircle 
                key={i} 
                className={`w-6 h-6 ${i < wrongCount ? "text-destructive fill-destructive/20" : "text-muted border-2 rounded-full"}`} 
              />
            ))}
          </div>
        </div>

        <ExerciseProgress
          current={currentExerciseIndex + 1}
          total={exercises.length}
          xp={xpEarned}
        />

        <motion.div
          key={currentExercise.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentExercise.type === "multiple-choice" && (
            <MultipleChoiceExercise
              exercise={currentExercise}
              onComplete={handleComplete}
            />
          )}
          {currentExercise.type === "ranking" && (
            <RankingExercise
              exercise={currentExercise}
              onComplete={handleComplete}
            />
          )}
          {currentExercise.type === "scoring" && (
            <ScoringExercise
              exercise={currentExercise}
              onComplete={handleComplete}
            />
          )}
          {currentExercise.type === "open-answer" && (
            <OpenAnswerExercise
              exercise={currentExercise}
              onComplete={handleComplete}
            />
          )}
          {currentExercise.type === "timed" && (
            <TimedExercise
              exercise={currentExercise}
              onComplete={handleComplete}
            />
          )}
          {currentExercise.type === "matching" && (
            <MatchingExercise
              exercise={currentExercise}
              onComplete={handleComplete}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Training;
