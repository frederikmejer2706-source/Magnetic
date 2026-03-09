# Magnetic — Charisma Training

## Overview
A React application for charisma training exercises. Users can train "magnetic signals" through gamified exercises including multiple choice, ranking, scoring, open-answer, timed, and matching activities. Features include a Duolingo-style roadmap for 20 training exercise sets across 4 difficulty levels and an AI-powered "Joke Maker" that judges how playful and charming user responses are to boring questions.

## Current State
- Imported from Lovable to Replit (Feb 2026)
- Frontend: Vite + React on port 5000
- Backend: Express API server on port 3001 (proxied via Vite)
- AI Integration: Replit AI Integrations (OpenAI) for Joke Maker judging

## Tech Stack
- React 18 with TypeScript
- Vite 5 (dev server + build, proxy /api to backend)
- Express (backend API server)
- OpenAI via Replit AI Integrations (gpt-5-mini)
- Tailwind CSS 3 with shadcn/ui components
- React Router DOM v6 for routing
- TanStack React Query v5
- Framer Motion for animations
- Lucide React for icons

## Project Structure
```
server/
  index.ts             - Express API server (port 3001) with /api/judge-answer endpoint
src/
  App.tsx              - Main app with sidebar layout, routes, header
  main.tsx             - Entry point
  index.css            - Tailwind config + custom utilities
  assets/              - Static assets (magnetic-character.png)
  components/
    app-sidebar.tsx    - Sidebar navigation component
    FloatingElements.tsx
    NavLink.tsx
    exercises/         - Exercise components (MultipleChoice, Ranking, Scoring, OpenAnswer, Timed, Matching, Progress, Complete)
    ui/                - shadcn/ui components (including sidebar)
  data/
    exercises.ts       - Exercise data (20 sets, 4 difficulty levels)
  hooks/               - Custom hooks (useProgress, use-toast, use-mobile)
  lib/
    utils.ts           - Utility functions
  pages/
    Index.tsx          - Landing page (Duolingo-style roadmap)
    JokeMaker.tsx      - AI-powered charisma exercise page
    Training.tsx       - Training exercise page (full-screen, no sidebar)
    ComingSoon.tsx     - Placeholder for upcoming features
    NotFound.tsx       - 404 page
```

## Routes
- `/` - Landing page with Duolingo-style roadmap and training overview
- `/jokes` - Joke Maker: AI judges user's playful answers to boring questions
- `/training/:setId` - Training exercise page (full-screen, no sidebar)
- `/quests` - Coming Soon
- `/shop` - Coming Soon
- `/leaderboard` - Coming Soon
- `/profile` - Coming Soon
- `*` - 404 Not Found

## API Endpoints
- `POST /api/judge-answer` - Sends boring question + user answer to AI for charisma scoring (Joke Maker)
- `POST /api/judge-open-answer` - AI evaluates open-answer exercise responses for correctness (score 1-5, feedback, key takeaway)

## User Preferences
- Keep open-ended/conversation answer questions as text input (don't convert to multiple choice)

## Exercise Types
- **multiple-choice**: Select from options, correctAnswer index
- **ranking**: Drag/reorder items into correct ranking
- **scoring**: Rate on 1-10 scale, scoringCorrectRange for validation
- **open-answer**: Free text input, AI-judged for correctness with score, feedback, and retry option
- **timed**: Countdown timer with text input, auto-submits at time limit
- **matching**: Pair left/right items, shuffled for each attempt

## Exercise Sets (20 total, 4 difficulty levels)
- **Beginner (1-5, green #58CC02)**: Foundations of Charisma, The Power of Presence, Confidence Signals, First Impressions, Social Status Cues
- **Intermediate (6-10, orange #E67E22)**: Voice & Delivery, Power in Body Language, Power Under Pressure, The Language of Power, Power in Appearance
- **Advanced (11-15, red #E74C3C)**: Power in Social Reactions, Stillness & Composure, Space & Territory, Powerful vs. Arrogant, Power in Conflict
- **True Master (16-20, purple #9B59B6)**: Power Through Expertise, Power Audit, Power in Status Hierarchies, Power Mastery: Full Scenarios, Build Your Power Identity

## Exercise Unlock Logic
- 20 exercise sets split into 4 difficulty levels: Beginner (1-5), Intermediate (6-10), Advanced (11-15), True Master (16-20)
- First set in each difficulty is always unlocked/accessible
- Completing a set unlocks the next set in the same difficulty group
- Completing the first set of a higher difficulty unlocks all sets in lower difficulties
- Visual dividers with colored pills separate difficulty sections on the roadmap

## Recent Changes
- Feb 2026: Imported from Lovable, configured Vite for Replit (port 5000, allowedHosts)
- Feb 2026: Added sidebar navigation with Duolingo-style layout
- Feb 2026: Added Joke Maker page with AI-powered answer judging (OpenAI integration)
- Feb 2026: Split exercises into 3 difficulty levels with unlock logic and visual dividers
- Feb 2026: Server updated to serve static files in production, deployment configured for autoscale
- Feb 2026: Expanded to 20 exercise sets with 4 difficulty levels (added True Master level)
- Feb 2026: Added 3 new exercise types: open-answer, timed (with countdown), and matching (pair items)
- Feb 2026: Populated full exercise content for all 20 sets with charisma/power training material
- March 2026: Restructured roadmap into a single "First Impressions" section with 5 sequential days. Day 1: "Be Better Than Good" (word-picker), Day 2: "Add Touch" (greeting), Day 3: "Posture Audit" (scoring), Day 4: "Eye Contact" (multiple-choice), Day 5: "Craft Your Answers" (word-picker). Removed Advanced Foundations section. Added "Real-World Missions" that appear after completing each day's exercises.
