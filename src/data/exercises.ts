export type ExerciseType = "multiple-choice" | "ranking" | "scoring" | "word-picker";

export interface Exercise {
  id: string;
  type: ExerciseType;
  scenario?: string;
  question: string;
  options?: string[];
  correctAnswer?: number;
  explanation: string;
  // word-picker specific
  words?: string[];
}

export interface ExerciseSet {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  locked: boolean;
  day: number;
  week: string;
  description: string;
  exercises: Exercise[];
}

export const difficultyGroups = [
  { level: 1 as const, label: "Beginner", sets: [1, 2, 3, 4, 5] },
];

export const exerciseSets: ExerciseSet[] = [
  {
    id: 1,
    day: 1,
    week: "Week 1",
    title: "First Impressions",
    subtitle: "Master the start",
    icon: "🎯",
    locked: false,
    description: "Your first interaction sets the tone for everything that follows. Learn to project warmth and competence from the very first second.",
    exercises: [
      {
        id: "1-1",
        type: "multiple-choice",
        question: "What is the most important element of a first impression?",
        options: ["What you say", "How you look", "Your energy and body language"],
        correctAnswer: 2,
        explanation: "Studies show that non-verbal cues are processed much faster than verbal ones in the first few seconds of an encounter.",
      }
    ],
  },
  {
    id: 2,
    day: 2,
    week: "Week 1",
    title: "Add Touch",
    subtitle: "Greet every person",
    icon: "🤝",
    locked: true,
    description: "Greeting everyone creates an inclusive environment and signals high social value.",
    exercises: [
      {
        id: "2-1",
        type: "multiple-choice",
        question: "When greeting a group, what is the best strategy?",
        options: ["Only greet the leader", "Briefly acknowledge everyone", "Wait for them to speak first"],
        correctAnswer: 1,
        explanation: "Greeting everyone signals that you are comfortable and inclusive, which are high-status traits.",
      }
    ],
  },
  {
    id: 3,
    day: 3,
    week: "Week 1",
    title: "Posture Audit",
    subtitle: "Own your space",
    icon: "🧍",
    locked: true,
    description: "Your posture affects your hormone levels and how others perceive your authority.",
    exercises: [
      {
        id: "3-1",
        type: "scoring",
        question: "How much space do you typically take up in a meeting (1 = Minimal, 10 = Maximum)?",
        explanation: "High-status individuals tend to take up more space comfortably, signaling they are not threatened by their environment.",
      }
    ],
  },
  {
    id: 4,
    day: 4,
    week: "Week 1",
    title: "Eye Contact",
    subtitle: "Notice the color",
    icon: "👁️",
    locked: true,
    description: "Eye contact is the bridge of connection. Learn the 'eye color' rule for perfect timing.",
    exercises: [
      {
        id: "4-1",
        type: "multiple-choice",
        question: "What is the 'Eye Color' rule for eye contact?",
        options: ["Stare until they look away", "Look long enough to notice their eye color", "Avoid looking at eyes directly"],
        correctAnswer: 1,
        explanation: "Noticing someone's eye color ensures you hold eye contact for the ideal 'charismatic' duration—about 3 seconds.",
      }
    ],
  },
  {
    id: 5,
    day: 5,
    week: "Week 1",
    title: "Craft Your Answers",
    subtitle: "Open the door",
    icon: "🗣️",
    locked: true,
    description: "Stop giving autopilot answers. Learn to provide hooks that invite deeper conversation.",
    exercises: [
      {
        id: "5-1",
        type: "word-picker",
        question: "Pick the 'hook' words in this charismatic answer to 'How was your weekend?': 'It was great, I finally tried that new jazz club downtown.'",
        words: ["It", "was", "great", "finally", "tried", "jazz", "club", "downtown"],
        options: ["jazz", "club", "downtown"],
        explanation: "Specific nouns like 'jazz club' act as hooks that give the other person something easy to ask about next.",
      }
    ],
  }
];
