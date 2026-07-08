import { useGame } from "../GameContext";
import moleImg from "../../public/mole.png";
import holeImg from "../../public/hole.png";
import Slot from "./Slot";
import SlotList from "./SlotList";
export default function GameScreen() {
  const { startGame, restartGame, isPlaying, score, highScores } = useGame();
  if (!isPlaying)
    return (
      <>
        <div className="center">
          <h1>🕳️Whack A Mole!🕳️</h1>
          <p>Directions: Click the mole where it appears. Each click is worth 1 point.</p>
          <button onClick={startGame}>Start Game</button>
          <h2>High Scores</h2>
          {highScores.map((score) => (
            <li>{score}</li>
          ))}
        </div>
      </>
    );
  return (
    <div className="center">
      <h1>🕳️Whack A Mole!🕳️</h1>
      <div className="center gameTopBar">
        <p>Score: {score}</p>
        <button onClick={restartGame}>Restart Game</button>
      </div>
      <SlotList />
    </div>
  );
}
