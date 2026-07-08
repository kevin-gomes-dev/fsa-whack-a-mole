import { useGame } from "../GameContext";
export default function Slot({ slot }) {
  const { resetMoleIndex, moleIndex, incrementScore } = useGame();
  return (
    <>
      <li
        className={`slot ${slot === moleIndex ? "mole" : "hole"}`}
        onClick={() => {
          if (slot === moleIndex) {
            incrementScore();
            resetMoleIndex();
          }
        }}
      ></li>
    </>
  );
}
