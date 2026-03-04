import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

app.post("/api/judge-answer", async (req, res) => {
  try {
    const { boringQuestion, userAnswer } = req.body;

    if (!boringQuestion || !userAnswer) {
      return res.status(400).json({ error: "Both boringQuestion and userAnswer are required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: `You are a charisma coach who judges how playful, witty, and charming someone's answer is to a boring question. 

You must respond with valid JSON only, no markdown. Use this exact format:
{
  "score": <number 1-5>,
  "feedback": "<2-3 sentences about their answer's charm level>",
  "tip": "<1 sentence pro tip for being more charismatic>",
  "vibe": "<one of: fire, cool, warm, meh, icy>"
}

Scoring guide:
5 (fire) = Incredibly witty, unexpected, makes people laugh
4 (cool) = Smooth, clever, shows great social awareness  
3 (warm) = Pleasant and friendly, but could be spicier
2 (meh) = Too safe or generic, needs more personality
1 (icy) = Awkward, too literal, or misses the social cue

Be encouraging but honest. Make feedback fun to read.`,
        },
        {
          role: "user",
          content: `Boring question: "${boringQuestion}"\n\nTheir answer: "${userAnswer}"`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content || "{}";
    const judgment = JSON.parse(content);

    res.json(judgment);
  } catch (error: any) {
    console.error("Error judging answer:", error);
    res.status(500).json({ error: error.message || "Failed to judge answer" });
  }
});

app.post("/api/judge-open-answer", async (req, res) => {
  try {
    const { question, expectedInsight, userAnswer } = req.body;

    if (!question || !userAnswer || !expectedInsight) {
      return res.status(400).json({ error: "question, expectedInsight, and userAnswer are required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: `You are a charisma and power dynamics coach evaluating a student's answer to an exercise question. You must judge whether their answer demonstrates understanding of the key concept.

You must respond with valid JSON only, no markdown. Use this exact format:
{
  "correct": <boolean>,
  "score": <number 1-5>,
  "feedback": "<2-3 sentences evaluating their understanding. Be specific about what they got right or missed.>",
  "keyPoint": "<1 sentence summarizing the most important thing they should take away>"
}

Scoring guide:
5 = Excellent understanding — nails the core concept and may add original insight
4 = Good understanding — covers the main point clearly
3 = Partial understanding — has the right idea but misses key nuances
2 = Weak understanding — vaguely related but misses the core concept
1 = Off track — doesn't demonstrate understanding of the concept

Score 3 or above = correct (true). Below 3 = incorrect (false).

Be encouraging but honest. The goal is learning, not just validation.`,
        },
        {
          role: "user",
          content: `Exercise Question: "${question}"\n\nExpected Key Insight: "${expectedInsight}"\n\nStudent's Answer: "${userAnswer}"`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content || "{}";
    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }

    const score = typeof parsed.score === "number" && parsed.score >= 1 && parsed.score <= 5
      ? Math.round(parsed.score) : 3;
    const correct = typeof parsed.correct === "boolean" ? parsed.correct : score >= 3;
    const feedback = typeof parsed.feedback === "string" && parsed.feedback.length > 0
      ? parsed.feedback : "Your answer has been reviewed.";
    const keyPoint = typeof parsed.keyPoint === "string" && parsed.keyPoint.length > 0
      ? parsed.keyPoint : expectedInsight;

    res.json({ correct, score, feedback, keyPoint });
  } catch (error: any) {
    console.error("Error judging open answer:", error);
    res.status(500).json({ error: error.message || "Failed to judge answer" });
  }
});

const distPath = path.resolve(__dirname, "..", "dist");
app.use(express.static(distPath));
app.get("/{*path}", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT === "5000" ? 5000 : 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API server running on port ${PORT}`);
});
