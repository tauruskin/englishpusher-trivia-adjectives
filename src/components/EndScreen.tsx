import { useEffect } from "react";
import confetti from "canvas-confetti";
import GameCharacter, { CharacterPose } from "@/components/GameCharacter";

interface EndScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const EndScreen = ({ score, total, onRestart }: EndScreenProps) => {
  const pct = Math.round((score / total) * 100);
  const isPerfect = score === total;
  const isGreat = score >= Math.ceil(total * 0.7);

  const emoji = isPerfect ? "🏆" : isGreat ? "🎉" : pct >= 50 ? "👍" : "💪";
  const message = isPerfect
    ? "PERFECT!"
    : isGreat
    ? "Excellent work!"
    : pct >= 50
    ? "Good effort!"
    : "Keep practicing! You've got this! 💪";

  useEffect(() => {
    if (isGreat) {
      const duration = isPerfect ? 3000 : 1500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: isPerfect ? 8 : 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6"],
        });
        confetti({
          particleCount: isPerfect ? 8 : 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isGreat, isPerfect]);

  const characterPose: CharacterPose = isPerfect ? "celebrate" : isGreat ? "happy" : "sad";

  return (
    <div className="flex items-center gap-8 justify-center">
      <GameCharacter pose={characterPose} className="flex-shrink-0" />
      <div className="w-full max-w-md text-center space-y-8 animate-slide-up">
        <div className={`text-7xl ${isPerfect ? 'animate-bounce' : 'animate-emoji-correct'}`}>{emoji}</div>
        <h2 className="font-display text-3xl font-bold text-foreground">{message}</h2>
        <div className="bg-card rounded-2xl p-8 border border-border shadow-md space-y-4">
          <div className="text-5xl font-display font-bold text-primary">{pct}%</div>
          <p className="text-muted-foreground">
            You got <span className="text-foreground font-semibold">{score}</span> out of{" "}
            <span className="text-foreground font-semibold">{total}</span> correct
          </p>
        </div>
        <button
          onClick={onRestart}
          className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
        >
          Play Again 🔄
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
