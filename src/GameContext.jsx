import { useState, createContext, useContext } from "react";
const GameContext = createContext();

// Hook, can be imported into components to get the context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw Error("Used outside of GameProvider");
  return context;
}

export function GameProvider({ children }) {
  // Number representing our score
  const [score, setScore] = useState(0);

  // Boolean to determine if currently playing
  const [isPlaying, setIsPlaying] = useState(false);

  // The array of holes or places a mole can be, single dimension, need styling to portray as 3x3
  const [slots, setSlots] = useState(Array.from({ length: 9 }, (unused, i) => i));

  // The index the mole resides in
  const [moleIndex, setMoleIndex] = useState(Math.floor(Math.random() * 8));

  // Some helpful state changing functions, that way if they change in future, other components won't need to change
  function restartGame() {
    setScore(0);
    setIsPlaying(false);
    resetMoleIndex();
  }

  function startGame() {
    setIsPlaying(true);
  }

  function incrementScore() {
    setScore(score + 1);
  }

  // Perhaps if you click a spot that isn't a mole?
  function decrementScore() {
    setScore(score - 1);
  }

  // 9 slots, one can have a mole. Make random number 0 - 8
  function resetMoleIndex() {
    const newMoleIndex = Math.floor(Math.random() * 8);
    setMoleIndex(newMoleIndex);
  }

  // Provider has value be the stuff to share, then renders all children. Thus, if we wrap this provider
  // around the top most component (the main) then every component can access value
  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        isPlaying,
        restartGame,
        startGame,
        incrementScore,
        decrementScore,
        slots,
        moleIndex,
        resetMoleIndex,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

/*
Game context: Use to give methods for setting score, whether playing, managing holes and restarting and starting the game.
Comp1: Use to show start screen, start game button.
Comp2: Use to show game screen, holes, mole, restart button and score.
Slot: Used to determine img to show, either mole or hole. Should 
*/
