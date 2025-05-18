
import { useState, useEffect, useCallback, useRef } from 'react';
import { getHighScore, setHighScore as saveHighScore } from '@/utils/storage';

export type GameState = 'idle' | 'ready' | 'waiting' | 'active' | 'result';

const MIN_WAIT_TIME = 2000; // 2 seconds
const MAX_WAIT_TIME = 5000; // 5 seconds

export const useReactionGame = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [currentWaitTime, setCurrentWaitTime] = useState(0); // For ghost indicator

  useEffect(() => {
    setHighScore(getHighScore());
  }, []);

  const startWaitingPhase = useCallback(() => {
    setGameState('waiting');
    setReactionTime(null);
    setIsNewHighScore(false);
    const waitTime = Math.random() * (MAX_WAIT_TIME - MIN_WAIT_TIME) + MIN_WAIT_TIME;
    setCurrentWaitTime(waitTime); // Store for ghost

    timerRef.current = setTimeout(() => {
      setGameState('active');
      startTimeRef.current = Date.now();
    }, waitTime);
  }, []);

  const startGame = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setGameState('ready');
    // Small delay before "waiting" to show "Get Ready"
    timerRef.current = setTimeout(startWaitingPhase, 1500); 
  }, [startWaitingPhase]);

  const handleTap = useCallback(() => {
    if (gameState === 'active') {
      if (startTimeRef.current) {
        const endTime = Date.now();
        const currentReactionTime = endTime - startTimeRef.current;
        setReactionTime(currentReactionTime);
        setGameState('result');

        if (highScore === null || currentReactionTime < highScore) {
          setHighScore(currentReactionTime);
          saveHighScore(currentReactionTime);
          setIsNewHighScore(true);
        }
      }
    } else if (gameState === 'waiting') {
      // Tapped too early
      if (timerRef.current) clearTimeout(timerRef.current);
      setReactionTime(-1); // Indicate a foul
      setGameState('result');
    }
  }, [gameState, highScore]);

  const resetGame = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setGameState('idle');
    setReactionTime(null);
    setIsNewHighScore(false);
    startTimeRef.current = null;
    setCurrentWaitTime(0);
  }, []);

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    gameState,
    reactionTime,
    highScore,
    isNewHighScore,
    startGame,
    handleTap,
    resetGame,
    currentWaitTime,
  };
};
