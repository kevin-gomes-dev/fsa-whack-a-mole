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

  // High scores, save up to 5, start as empty array
  const [highScores, setHighScores] = useState(Array.from({ length: 0 }, (unused, i) => i));

  // Some helpful state changing functions, that way if they change in future, other components won't need to change
  function restartGame() {
    // Save high score if the length of the array is < 5 and the score is greater than at least one score
    let keepChecking = true;

    // Make copy to avoid directly modifying state, do all operations on copy before allowing react to
    // async update state
    const highScoreCopy = highScores.slice();
    if (highScoreCopy.length < 5) highScoreCopy.push(score);
    else
      for (let i = 0; i < highScoreCopy.length && keepChecking; i++) {
        if (score > highScoreCopy[i]) {
          keepChecking = false;
          // Remove last item as when sorted should be lowest score
          highScoreCopy.pop();
          // Add the new score
          highScoreCopy.push(score);
        }
      }
    highScoreCopy.sort((a, b) => b - a);

    // Update state
    setHighScores(highScoreCopy);
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
    let newMoleIndex = Math.floor(Math.random() * 8);
    // Guarantee random mole location
    while (newMoleIndex === moleIndex) {
      newMoleIndex = Math.floor(Math.random() * 8);
    }
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
        highScores,
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
