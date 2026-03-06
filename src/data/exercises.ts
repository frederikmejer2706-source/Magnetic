export type ExerciseType = "multiple-choice" | "ranking" | "scoring" | "multi-select" | "open-answer" | "timed" | "matching";

export interface MatchPair {
  left: string;
  right: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  scenario?: string;
  question: string;
  options?: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  explanation: string;
  rankItems?: string[];
  correctRanking?: number[];
  scoringCorrectRange?: [number, number];
  timeLimit?: number;
  matchPairs?: MatchPair[];
}

export interface ExerciseSet {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: 1 | 2 | 3 | 4;
  locked: boolean;
  exercises: Exercise[];
}

export const difficultyGroups = [
  { level: 1 as const, label: "Beginner", sets: [1] },
];

export const exerciseSets: ExerciseSet[] = [
  {
    id: 1,
    title: "First Impressions",
    subtitle: "Master the start",
    icon: "🎯",
    difficulty: 1,
    locked: false,
    exercises: [],
  },
];
