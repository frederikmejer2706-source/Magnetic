

## Add Sound Effects to Training Exercises

Lightweight, satisfying sound effects using the **Web Audio API** -- no external libraries or API keys needed. Sounds are generated programmatically, so they load instantly and work offline.

### Sounds to add

| Event | Sound | Feel |
|-------|-------|------|
| Correct answer | Rising chime (two ascending tones) | Rewarding, uplifting |
| Wrong answer | Soft low tone (gentle "womp") | Not punishing, just informative |
| Select option | Subtle click/tap | Tactile feedback |
| Level up / Set complete | Victory fanfare (ascending arpeggio) | Celebratory, Duolingo-style |
| Button press (CHECK) | Soft confirmation beep | Satisfying |

### Technical approach

1. **Create `src/hooks/useSoundEffects.ts`** -- a custom hook that uses the Web Audio API (`AudioContext`) to synthesize short tones:
   - `playCorrect()` -- two quick ascending sine wave notes
   - `playWrong()` -- single lower-pitched tone with slight decay
   - `playClick()` -- very short, quiet tick sound
   - `playLevelUp()` -- 4-note ascending arpeggio with slight reverb feel
   - `playCheck()` -- medium-pitched confirmation blip
   - Lazy-initializes `AudioContext` on first user interaction (required by browsers)

2. **Integrate into exercise components**:
   - `MultipleChoiceExercise.tsx` -- `playClick()` on option select, `playCorrect()`/`playWrong()` on submit, sound on continue
   - `RankingExercise.tsx` -- `playClick()` on item tap, `playCorrect()`/`playWrong()` on check
   - `ScoringExercise.tsx` -- `playCorrect()`/`playWrong()` on check
   - `ExerciseComplete.tsx` -- `playLevelUp()` on mount

3. **No new dependencies** -- pure Web Audio API, works in all modern browsers.

