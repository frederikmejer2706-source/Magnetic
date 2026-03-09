import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { exerciseSets } from "@/data/exercises";
import { dayMissions } from "@/data/missions";
import { useProgress } from "@/hooks/useProgress";
import ExerciseProgress from "@/components/exercises/ExerciseProgress";
import MultipleChoiceExercise from "@/components/exercises/MultipleChoiceExercise";
import RankingExercise from "@/components/exercises/RankingExercise";
import ScoringExercise from "@/components/exercises/ScoringExercise";
import ExerciseComplete from "@/components/exercises/ExerciseComplete";
import WordPickerExercise from "@/components/exercises/WordPickerExercise";
import { ArrowLeft } from "lucide-react";

const Training = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const { addXp, completeSet } = useProgress();

  const setIndex = parseInt(setId || "1", 10);
  const exerciseSet = exerciseSets.find((s) => s.id === setIndex);

  const [showIntro, setShowIntro] = useState(true);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [completed, setCompleted] = useState(false);

  const exercises = exerciseSet?.exercises || [];
  const currentExercise = exercises[currentExerciseIndex];

  const handleComplete = (correct: boolean) => {
    const xp = correct ? 10 : 3;
    setXpEarned((prev) => prev + xp);
    if (correct) setCorrectCount((prev) => prev + 1);
    addXp(xp);

    if (currentExerciseIndex + 1 >= exercises.length) {
      completeSet(setIndex);
      setCompleted(true);
    } else {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  };

  if (!exerciseSet) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-secondary rounded-3xl flex items-center justify-center text-5xl mb-6">
          ❓
        </div>
        <h1 className="text-3xl font-black mb-2">Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          The training day you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#58CC02] hover:bg-[#46A302] text-white font-black px-8 py-4 rounded-2xl text-xl shadow-[0_4px_0_0_#46A302]"
        >
          BACK TO ROADMAP
        </button>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 rounded-3xl bg-[#58CC02] flex items-center justify-center text-5xl mb-8 shadow-[0_8px_0_0_#46A302]">
          {exerciseSet.icon}
        </div>
        <h2 className="text-3xl font-black mb-4">Coming Soon!</h2>
        <p className="text-xl text-muted-foreground font-bold mb-8 max-w-sm">
          We're still crafting the perfect exercises for{" "}
          <strong>{exerciseSet.title}</strong>. Check back tomorrow!
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-12 py-4 rounded-2xl font-black text-xl bg-[#58CC02] text-white shadow-[0_6px_0_0_#46A302]"
        >
          GO BACK
        </button>
      </div>
    );
  }

  if (completed) {
    const passed = correctCount / exercises.length >= 0.5;
    const mission = dayMissions[exerciseSet.day];
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <ExerciseComplete
          setTitle={exerciseSet.title}
          xpEarned={xpEarned}
          correctCount={correctCount}
          totalCount={exercises.length}
          status={passed ? "passed" : "failed"}
          mission={passed ? mission : undefined}
        />
      </div>
    );
  }

  // Intro screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-bold text-[#58CC02] uppercase tracking-wider mb-1">
              {exerciseSet.week}
            </p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Day {exerciseSet.day}
            </p>

            <div className="w-16 h-16 rounded-2xl bg-[#58CC02] flex items-center justify-center mb-6 text-3xl shadow-[0_4px_0_0_#46A302] text-white">
              {exerciseSet.icon}
            </div>

            <h1 className="text-3xl font-black text-foreground mb-3 leading-tight">
              {exerciseSet.title}
            </h1>
            <p className="text-muted-foreground font-semibold mb-8 text-lg leading-relaxed">
              {exerciseSet.subtitle}
            </p>

            <div className="bg-white dark:bg-card rounded-2xl p-6 mb-8 shadow-md border-b-4 border-gray-100">
              <p className="text-foreground font-medium leading-relaxed">
                {exerciseSet.description}
              </p>
            </div>

            <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-[#58CC02]/10 border border-[#58CC02]/20">
              <span className="text-2xl">📝</span>
              <div>
                <p className="font-bold text-foreground text-sm">
                  {exercises.length} exercises
                </p>
                <p className="text-muted-foreground text-xs font-medium">
                  ~{exercises.length * 2} minutes
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => setShowIntro(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-5 rounded-2xl font-black text-xl bg-[#58CC02] text-white shadow-[0_6px_0_0_#46A302]"
            >
              START DAY {exerciseSet.day} →
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {exerciseSet.week} · Day {exerciseSet.day}
            </h1>
            <p className="text-lg font-bold text-foreground">
              {exerciseSet.title}
            </p>
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
          exit={{ opacity: 0, x: -30 }}
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
          {currentExercise.type === "word-picker" && (
            <WordPickerExercise
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
