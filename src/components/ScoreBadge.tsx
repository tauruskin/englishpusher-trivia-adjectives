interface ScoreBadgeProps {
  score: number;
  total: number;
}

const ScoreBadge = ({ score, total }: ScoreBadgeProps) => (
  <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg font-display">
    <span className="text-muted-foreground text-sm">Score</span>
    <span className="text-primary font-bold text-lg">{score}</span>
    <span className="text-muted-foreground text-sm">/ {total}</span>
  </div>
);

export default ScoreBadge;
