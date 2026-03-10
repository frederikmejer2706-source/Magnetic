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
  { level: 1 as const, label: "First Impressions", sets: [1, 2, 3, 4, 5] },
];

export const exerciseSets: ExerciseSet[] = [
  {
    id: 1,
    day: 1,
    week: "Week 1",
    title: "Be Better Than Good",
    subtitle: "Ditch the autopilot",
    icon: "✨",
    locked: false,
    description:
      "Stop giving autopilot answers. Learn to respond with energy, inflection, and genuine emotion — all three together.",
    exercises: [
      {
        id: "1-1",
        type: "multiple-choice",
        question:
          'Why does saying "fantastic" in a flat tired voice fail even though it is a better word than "fine"?',
        options: [
          "People are suspicious of overly positive words and read them as fake",
          'The word without the matching inflection and energy is still just autopilot — a different script, not a real moment',
          '"Fantastic" is too formal for casual conversation and makes people uncomfortable',
          "Words only matter when you already have a strong relationship with someone",
        ],
        correctAnswer: 1,
        explanation:
          "The word is the vehicle but inflection and energy are the engine. Without them the word arrives empty. All three elements — word, inflection, and genuine emotion — have to be present at the same time for it to actually land.",
      },
      {
        id: "1-2",
        type: "multiple-choice",
        question:
          "You have chosen your word and practiced it. You are about to walk into college and know the first person you see is going to ask how you are. What is the single most useful thing to do in the ten seconds before you walk through the door?",
        options: [
          "Remind yourself of your word so you do not forget it in the moment",
          "Take a breath, bring your body to an open posture, and recall the specific feeling you want to carry in with you",
          "Think of something genuinely good that happened recently so you have real emotion behind the word",
          "Both B and C together",
        ],
        correctAnswer: 3,
        explanation:
          "The ten seconds before the moment is where the whole thing is won or lost. Body and emotion together create the conditions for the word to land with real impact. Remembering the word alone is not enough — you need the physical state and the genuine feeling ready before the door opens.",
      },
      {
        id: "1-3",
        type: "multiple-choice",
        question:
          "You have used your word three times today and it felt slightly unnatural and performed each time. What does this most likely mean and what should you do?",
        options: [
          "The word you chose is wrong for your personality — pick a different one",
          "This technique is not suited to your natural communication style",
          "Unnatural is exactly how new behavior feels at first — the discomfort means you are rewiring something real and it will smooth out with repetition",
          "You need to practice in private more before using it in real situations",
        ],
        correctAnswer: 2,
        explanation:
          "Every new behavior feels performed before it feels natural — that gap is not a sign something is wrong, it is a sign something is changing. Your new word has three repetitions. Give it the same volume of practice before judging whether it suits you. The discomfort is the work.",
      },
      {
        id: "1-4",
        type: "multiple-choice",
        question:
          "Why is visualising the specific moment before you use your word more effective than just deciding to use it from now on?",
        options: [
          "Visualisation builds confidence by making you feel prepared",
          "Deciding to change behavior without anchoring it to a specific trigger relies on willpower which almost always fails — the visualisation builds an automatic cue that fires without conscious effort",
          "Imagining success makes success more likely by programming positive expectations",
          "It gives you something concrete to practice when you are not in social situations",
        ],
        correctAnswer: 1,
        explanation:
          "Willpower is unreliable because the moment the situation arrives your brain defaults to its strongest existing pattern. A trigger works differently — by repeatedly imagining the specific sensory details of the moment before you need the new behavior, you build a direct link between that cue and the new response. This is how habits are actually built: not through intention but through conditioned response.",
      },
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
    description:
      "Greeting everyone creates an inclusive environment and signals genuine warmth. Nobody gets skipped — especially the awkward ones.",
    exercises: [
      {
        id: "2-1",
        type: "multiple-choice",
        question:
          "What makes greeting everyone in a room — including people you barely know — so powerful compared to just greeting your close friends?",
        options: [
          "It shows social confidence because approaching strangers is something most people avoid",
          "It communicates that nobody in the room is beneath your attention which is one of the most magnetic things a person can signal without words",
          "It gives you more opportunities to practice your handshake and physical greeting",
          "It ensures everyone knows who you are which builds your social reputation over time",
        ],
        correctAnswer: 1,
        explanation:
          "The magic is not in the greeting itself — it is in the everyone. Most people unconsciously sort rooms into people worth acknowledging and people they can ignore. When you greet everyone without that filter you communicate something profound — that your attention and warmth are not rationed based on status or familiarity.",
      },
      {
        id: "2-2",
        type: "multiple-choice",
        question:
          "You walk into a house party and spot your three close friends across the room. There are also eight other people you know to varying degrees scattered around. What is the right move?",
        options: [
          "Go straight to your close friends first to establish yourself then work your way around the room",
          "Do a general wave and smile at the room then head to your friends",
          "Move through the room and greet every person individually before joining your friends",
          "Greet the people closest to the door first since that is the natural path in",
        ],
        correctAnswer: 2,
        explanation:
          "Going straight to your friends first immediately creates an invisible hierarchy in the room — your friends matter, everyone else is secondary. Greeting everyone first communicates the opposite. It also means by the time you sit down with your friends you have already made contact with every person in the room, which changes the entire energy of the rest of the night.",
      },
      {
        id: "2-3",
        type: "multiple-choice",
        question:
          "You are moving through the room greeting people and you reach someone you had an awkward interaction with last time you saw them. What do you do?",
        options: [
          "Skip them this time — the exercise is about building positive connections not reopening awkward ones",
          "Give them a quick nod from a distance so they are acknowledged but you do not have to engage",
          "Greet them the same way you greeted everyone else — a complete moment, appropriate physical greeting, eye contact",
          "Acknowledge them verbally but skip the physical greeting to keep it brief",
        ],
        correctAnswer: 2,
        explanation:
          "This is exactly the person the exercise is designed for. Skipping them or giving them a lesser greeting broadcasts the awkwardness to the whole room and cements it between you. Greeting them exactly as you greeted everyone else signals that you are not carrying it, which often dissolves the awkwardness faster than any direct conversation about it would.",
      },
      {
        id: "2-4",
        type: "multiple-choice",
        question:
          "After doing this exercise you notice the room feels different — people seem more open and relaxed with you for the rest of the evening. What is the most likely reason?",
        options: [
          "You are more confident after completing the greeting ritual which people respond to",
          "Each individual greeting created a small moment of real connection that primed every person in the room to feel positively toward you before any real conversation started",
          "Physical touch releases oxytocin which puts people in a better mood generally",
          "Both A and B together",
        ],
        correctAnswer: 3,
        explanation:
          "Both things are happening simultaneously. The act of deliberately greeting everyone shifts your own state — you are no longer a passive arrival waiting to be noticed, you are an active presence. And each individual you greeted had a small but real moment of feeling acknowledged. By the time any real conversation starts both sides are already slightly warmer than they would have been otherwise.",
      },
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
    description:
      "Your body broadcasts a signal all day whether you are paying attention to it or not. Today you pay attention.",
    exercises: [
      {
        id: "3-1",
        type: "multiple-choice",
        question:
          "Why does your posture affect your confidence level and not just how others see you?",
        options: [
          "Good posture makes you taller which gives you a physical advantage",
          "Your body language signals your emotional state to your own brain, not just to others",
          "People treat you better when you stand up straight which makes you feel good",
          "Posture only affects how others perceive you, not how you feel internally",
        ],
        correctAnswer: 1,
        explanation:
          "Research shows that adopting open, expansive posture changes your hormone levels — raising testosterone and lowering cortisol — within about two minutes. Your body is not just reflecting your confidence, it is actively creating it.",
      },
      {
        id: "3-2",
        type: "multiple-choice",
        question:
          "You are about to walk into a job interview feeling nervous. Which physical action will have the most immediate positive effect on your confidence?",
        options: [
          "Take a few deep slow breaths and roll your shoulders back before entering",
          "Smile at yourself in the bathroom mirror",
          "Text a friend for encouragement",
          "Walk in quickly to get it over with before the nerves build",
        ],
        correctAnswer: 0,
        explanation:
          "Breathing and posture directly regulate your nervous system. Slow breathing activates the parasympathetic system which reduces anxiety. Open posture signals safety to your brain. Together they are the fastest available confidence tool.",
      },
      {
        id: "3-3",
        type: "multiple-choice",
        question:
          "A friend says they feel confident on the inside but their body language — hunched, arms crossed, eyes down — suggests otherwise. What is actually happening here?",
        options: [
          "Their inner confidence is genuine and their body language does not matter",
          "They are probably more anxious than they realize and their body is showing it honestly",
          "Some people naturally have closed body language regardless of how they feel",
          "Body language only matters in formal situations like interviews",
        ],
        correctAnswer: 1,
        explanation:
          "The body and mind are in constant conversation. Closed body language both reflects and reinforces anxiety. If someone's body is consistently closed, it is almost always a signal that their confidence is more fragile than they consciously recognize — and the fastest fix is to start with the body, not the mind.",
      },
      {
        id: "3-4",
        type: "scoring",
        question:
          "Right now, before you adjust anything — how open and expansive is your current posture? (1 = fully collapsed, 10 = fully open and grounded)",
        explanation:
          "Most people sit at a 3–5 without realizing it. The goal is not to force a 10 permanently — it is to raise your baseline by one or two points consistently. Awareness is the first step.",
      },
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
    description:
      "Hold eye contact long enough to notice the color of someone's eyes. That is the right duration — long enough to actually see them, not so long it becomes a stare.",
    exercises: [
      {
        id: "4-1",
        type: "multiple-choice",
        question:
          "What is the ideal duration for eye contact during a one-on-one conversation?",
        options: [
          "Constant eye contact to show you are fully engaged",
          "Brief glances to avoid making the other person uncomfortable",
          "Long enough to notice the color of their eyes, with natural breaks",
          "Match whatever the other person does exactly",
        ],
        correctAnswer: 2,
        explanation:
          "The 'notice their eye color' rule gives you a concrete and natural duration — long enough to feel genuine and present, short enough not to become a stare. Natural eye contact always has a rhythm to it rather than being constant or fragmented.",
      },
      {
        id: "4-2",
        type: "multiple-choice",
        question:
          "You break eye contact during a conversation. Which direction should you look and why?",
        options: [
          "Down, because it shows you are thinking carefully",
          "To the side, because it reads as thinking rather than submitting",
          "Up, because it signals you are accessing your memory",
          "It does not matter as long as you look back quickly",
        ],
        correctAnswer: 1,
        explanation:
          "Breaking eye contact downward is unconsciously read as shame, submission, or dishonesty. Breaking sideways reads as natural thinking. This one small habit change significantly affects how confident and trustworthy you appear.",
      },
      {
        id: "4-3",
        type: "multiple-choice",
        question:
          "You are talking to someone who barely makes eye contact with you throughout the conversation. How should this change how you approach the interaction?",
        options: [
          "Match their energy and reduce your eye contact too",
          "Stare at them more to signal that you want more engagement",
          "Maintain your own natural eye contact and give them space to warm up",
          "Ask them directly why they are not making eye contact",
        ],
        correctAnswer: 2,
        explanation:
          "Mirroring someone's avoidance makes the interaction feel flat for both people. Holding your own natural, warm eye contact creates a safe invitation for the other person to open up without pressuring them. Confident people set the standard for the interaction rather than defaulting to whatever the other person does.",
      },
      {
        id: "4-4",
        type: "multiple-choice",
        question:
          "You are speaking — not just listening — and you decide to hold eye contact throughout. What is most likely to happen?",
        options: [
          "The other person will feel uncomfortable and disengage",
          "Nothing different — eye contact only matters when you are listening",
          "The other person will unconsciously match your energy and the conversation will deepen",
          "You will appear aggressive or domineering",
        ],
        correctAnswer: 2,
        explanation:
          "Most people drop eye contact when speaking because they are thinking. Holding it while you speak signals that you are confident in what you are saying and fully present. The other person unconsciously reads this as authority and usually mirrors it back, deepening the connection.",
      },
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
    description:
      "Most people give terrible answers to common questions because they have never thought about them. Today you prepare answers that open doors instead of closing them.",
    exercises: [
      {
        id: "5-1",
        type: "multiple-choice",
        question:
          "Why do most people give boring answers to common questions like 'what do you do' or 'where are you from'?",
        options: [
          "They are deliberately keeping things private",
          "They have never thought about those questions before the moment they are asked",
          "Simple answers are more polite in social situations",
          "People do not actually want interesting answers to small talk questions",
        ],
        correctAnswer: 1,
        explanation:
          "Most people respond on autopilot with the first obvious answer because they have never prepared anything better. A small amount of preparation — thinking through how to answer these questions interestingly — immediately separates you from almost everyone else in a social setting.",
      },
      {
        id: "5-2",
        type: "multiple-choice",
        question:
          "Someone asks where you are from. Which answer is most likely to create an interesting conversation?",
        options: [
          "London",
          "London, born and raised",
          "London — grew up right next to this incredible market that basically shaped everything I eat and care about",
          "London, but I've moved around a lot since then",
        ],
        correctAnswer: 2,
        explanation:
          "Answer C gives a specific detail that opens a door — the other person can now ask about the market, about food, about how places shape people. It turns a dead-end answer into an invitation. The specific detail is what makes it interesting, not the city itself.",
      },
      {
        id: "5-3",
        type: "multiple-choice",
        question:
          "Your crafted answer to 'what do you do' gets a great reaction the first time. But you use the exact same answer word for word every time for the next month. What problem might develop?",
        options: [
          "No problem — a good answer is a good answer regardless of how many times you use it",
          "You might start to sound rehearsed and lose the genuine spontaneity that made it work originally",
          "People will start to share your answer with each other and it will lose its impact",
          "The answer will become less accurate over time as your life changes",
        ],
        correctAnswer: 1,
        explanation:
          "Prepared answers are a starting point, not a script. The goal is to internalize why the answer works — the specific detail, the open door, the genuine reveal — so you can generate that quality naturally in the moment rather than reciting something rehearsed. Over-rehearsed answers lose the aliveness that made them good.",
      },
      {
        id: "5-4",
        type: "word-picker",
        question:
          "Pick the 'hook' words in this answer to 'How was your weekend?': 'It was great, I finally tried that new jazz club downtown.'",
        words: [
          "It",
          "was",
          "great",
          "I",
          "finally",
          "tried",
          "that",
          "new",
          "jazz",
          "club",
          "downtown",
        ],
        options: ["finally", "jazz", "club", "downtown"],
        explanation:
          "Words like 'finally' signal a story behind it (why finally?), and specific nouns like 'jazz club downtown' give the other person something concrete and easy to ask about next. These are your hooks — the parts that invite a follow-up question.",
      },
    ],
  },
];