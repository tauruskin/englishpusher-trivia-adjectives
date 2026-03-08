import { useState, useCallback } from "react";
import wordList, { WordEntry, enabledQuestionTypes } from "@/data/wordList";

export type QuestionType = "en-to-native" | "native-to-en" | "fill-blank" | "true-false" | "matching";

export interface Question {
  type: QuestionType;
  word: WordEntry;
  words?: WordEntry[];          // for matching (5 words)
  options?: string[];
  correctAnswer: string;
  shownTranslation?: string;    // for true-false
}

const configToType: Record<string, QuestionType> = {
  multipleChoice: "en-to-native",
  reversed: "native-to-en",
  fillBlank: "fill-blank",
  trueOrFalse: "true-false",
  matching: "matching",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildSingleQuestion(word: WordEntry, type: QuestionType): Question {
  if (type === "fill-blank") {
    return { type, word, correctAnswer: word.word };
  }

  if (type === "true-false") {
    const isTrue = Math.random() < 0.5;
    const shownTranslation = isTrue
      ? word.translation
      : shuffle(wordList.filter((w) => w.word !== word.word))[0].translation;
    return { type, word, correctAnswer: isTrue ? "true" : "false", shownTranslation };
  }

  const others = wordList.filter((w) => w.word !== word.word);
  const wrongOnes = shuffle(others).slice(0, 3);

  if (type === "en-to-native") {
    const options = shuffle([word.translation, ...wrongOnes.map((w) => w.translation)]);
    return { type, word, options, correctAnswer: word.translation };
  } else {
    // native-to-en
    const options = shuffle([word.word, ...wrongOnes.map((w) => w.word)]);
    return { type, word, options, correctAnswer: word.word };
  }
}

function generateQuestions(count: number): Question[] {
  const enabledTypes = enabledQuestionTypes.map((t) => configToType[t]).filter(Boolean);
  const singleTypes = enabledTypes.filter((t) => t !== "matching");
  const matchingEnabled = enabledTypes.includes("matching");

  const shuffled = shuffle(wordList).slice(0, Math.min(count, wordList.length));
  const questions: Question[] = [];
  let i = 0;

  while (i < shuffled.length) {
    // ~20% chance of matching if enabled and ≥5 words remain
    if (matchingEnabled && shuffled.length - i >= 5 && Math.random() < 0.2) {
      const matchWords = shuffled.slice(i, i + 5);
      questions.push({
        type: "matching",
        word: matchWords[0],
        words: matchWords,
        correctAnswer: "matched",
      });
      i += 5;
    } else {
      const word = shuffled[i];
      const type =
        singleTypes.length > 0
          ? singleTypes[Math.floor(Math.random() * singleTypes.length)]
          : "en-to-native";
      questions.push(buildSingleQuestion(word, type));
      i++;
    }
  }

  return questions;
}

export function useGame(questionCount = wordList.length) {
  const [questions, setQuestions] = useState<Question[]>(() => generateQuestions(questionCount));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const currentQuestion = questions[currentIndex] ?? null;

  const submitAnswer = useCallback(
    (answer: string) => {
      if (answered || !currentQuestion) return;
      const correct = answer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setAnswered(true);
      if (correct) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }

      // Matching handles its own celebration internally — short delay
      const isMatching = currentQuestion.type === "matching";
      const isFillBlank = currentQuestion.type === "fill-blank";
      const feedbackDelay = isMatching
        ? 300
        : isFillBlank
          ? correct ? 2000 : 4000
          : 1000;

      setTimeout(() => {
        setTransitioning(true);
        setTimeout(() => {
          if (currentIndex + 1 >= questions.length) {
            setGameOver(true);
          } else {
            setCurrentIndex((i) => i + 1);
          }
          setAnswered(false);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setTransitioning(false);
        }, 300);
      }, feedbackDelay);
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
    setStreak(0);
    setTransitioning(false);
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
    streak,
    transitioning,
    submitAnswer,
    restart,
  };
}
