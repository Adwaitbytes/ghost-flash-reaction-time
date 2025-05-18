
const HIGH_SCORE_KEY = 'reactionGameHighScore';

export const getHighScore = (): number | null => {
  const score = localStorage.getItem(HIGH_SCORE_KEY);
  return score ? parseInt(score, 10) : null;
};

export const setHighScore = (score: number): void => {
  localStorage.setItem(HIGH_SCORE_KEY, score.toString());
};
