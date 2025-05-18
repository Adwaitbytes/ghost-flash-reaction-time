
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReactionGame, GameState } from '@/hooks/useReactionGame';
import AnimatedButton from '@/components/ui_elements/AnimatedButton';
import GhostIndicator from '@/components/game/GhostIndicator';
import { Zap, AlertTriangle, PartyPopper, Rabbit, Turtle } from 'lucide-react';

const GameScreen: React.FC = () => {
  const {
    gameState,
    reactionTime,
    highScore,
    isNewHighScore,
    startGame,
    handleTap,
    resetGame,
    currentWaitTime,
  } = useReactionGame();

  const getGameStateContent = () => {
    switch (gameState) {
      case 'idle':
        return (
          <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-light-purple animate-pulse-glow">Reaction Test</h1>
            <AnimatedButton onClick={startGame} className="text-2xl px-10 py-5">
              Start Game
            </AnimatedButton>
            {highScore !== null && (
              <p className="mt-8 text-xl text-secondary-purple">
                Fastest Time: <span className="font-bold text-primary-purple">{highScore}ms</span>
              </p>
            )}
          </motion.div>
        );
      case 'ready':
        return (
          <motion.h2 key="ready" className="text-4xl md:text-6xl font-semibold text-primary-purple" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            Get Ready...
          </motion.h2>
        );
      case 'waiting':
        return (
          <motion.h2 key="waiting" className="text-4xl md:text-6xl font-semibold text-sky-blue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Wait for Green
          </motion.h2>
        );
      case 'active':
        return (
          <motion.div key="active" className="w-full h-full flex flex-col items-center justify-center bg-bright-blue cursor-pointer" onClick={handleTap} initial={{ opacity: 0.5, scale:0.98 }} animate={{ opacity: 1, scale:1 }} transition={{duration:0.1}}>
            <h2 className="text-5xl md:text-8xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              TAP NOW!
            </h2>
          </motion.div>
        );
      case 'result':
        return (
          <motion.div key="result" className="text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            {reactionTime === -1 ? (
              <>
                <AlertTriangle size={64} className="text-red-500 mx-auto mb-4" />
                <h2 className="text-4xl md:text-6xl font-bold text-red-400 mb-4">Too Soon!</h2>
                <p className="text-xl text-muted-foreground mb-6">Patience, young padawan.</p>
              </>
            ) : (
              <>
                {isNewHighScore && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, -5, 5, -5, 5, 0] }} transition={{ type: 'spring', stiffness: 300, damping: 10, delay: 0.2 }} className="inline-block mb-3">
                    <PartyPopper size={48} className="text-yellow-400 mx-auto" />
                    <p className="text-lg font-semibold text-yellow-400">New High Score!</p>
                  </motion.div>
                )}
                <h2 className={`text-6xl md:text-8xl font-bold mb-2 ${isNewHighScore ? 'text-yellow-400 animate-pulse-glow' : 'text-primary-purple'}`}>
                  {reactionTime} <span className="text-4xl md:text-5xl align-super">ms</span>
                </h2>
                 {reactionTime && reactionTime > 0 && (
                  reactionTime < 150 ? <Rabbit size={40} className="mx-auto my-2 text-green-400" /> :
                  reactionTime < 250 ? <Zap size={40} className="mx-auto my-2 text-sky-400" /> :
                  <Turtle size={40} className="mx-auto my-2 text-orange-400" />
                )}
                <p className="text-xl text-muted-foreground mb-6">
                  High Score: <span className="font-semibold text-secondary-purple">{highScore ?? 'N/A'}ms</span>
                </p>
              </>
            )}
            <AnimatedButton onClick={resetGame} className="text-xl px-8 py-4">
              Try Again
            </AnimatedButton>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const isGhostVisible = gameState === 'waiting' && highScore !== null && highScore > 0 && currentWaitTime > 0;

  return (
    <div className="w-full max-w-3xl min-h-[70vh] md:min-h-[400px] glass-effect rounded-xl p-6 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden select-none"
      onClick={gameState === 'waiting' || gameState === 'active' ? handleTap : undefined}
    >
      <AnimatePresence mode="wait">
        {getGameStateContent()}
      </AnimatePresence>
      {isGhostVisible && highScore && (
         <GhostIndicator
            isVisible={true}
            animateAt={highScore}
            gameDuration={currentWaitTime}
          />
      )}
    </div>
  );
};

export default GameScreen;

