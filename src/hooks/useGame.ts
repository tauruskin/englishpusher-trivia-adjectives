import { useState, useMemo, useCallback } from "react";
import wordList, { WordEntry } from "@/data/wordList";

export type QuestionType = "en-to-native" | "native-to-en" | "fill-blank";

export interface Question {
  type: QuestionType;
  word: WordEntry;
  options?: string[];
  correctAnswer: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(count: number): Question[] {
  const shuffled = shuffle(wordList);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map((word) => {
    const types: QuestionType[] = ["en-to-native", "native-to-en", "fill-blank"];
    const type = types[Math.floor(Math.random() * types.length)];

    if (type === "fill-blank") {
      return { type, word, correctAnswer: word.word };
    }

    // Generate 3 wrong options
    const others = wordList.filter((w) => w.word !== word.word);
    const wrongOnes = shuffle(others).slice(0, 3);

    if (type === "en-to-native") {
      const options = shuffle([word.translation, ...wrongOnes.map((w) => w.translation)]);
      return { type, word, options, correctAnswer: word.translation };
    } else {
      const options = shuffle([word.word, ...wrongOnes.map((w) => w.word)]);
      return { type, word, options, correctAnswer: word.word };
    }
  });
}

export function useGame(questionCount = 10) {
  const [questions, setQuestions] = useState<Question[]>(() => generateQuestions(questionCount));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const currentQuestion = questions[currentIndex] ?? null;

  const submitAnswer = useCallback(
    (answer: string) => {
      if (answered || !currentQuestion) return;
      const correct = answer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setAnswered(true);
      if (correct) setScore((s) => s + 1);

      setTimeout(() => {
        if (currentIndex + 1 >= questions.length) {
          setGameOver(true);
        } else {
          setCurrentIndex((i) => i + 1);
        }
        setAnswered(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
      }, 1200);
    },
    [answered, currentQuestion, currentIndex, questions.length]
  );

  const restart = useCallback(() => {
    setQuestions(generateQuestions(questionCount));
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameOver(false);
  }, [questionCount]);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    score,
    answered,
    selectedAnswer,
    isCorrect,
    gameOver,
    submitAnswer,
    restart,
  };
}
