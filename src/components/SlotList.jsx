import { useGame } from "../GameContext";
import Slot from "./Slot";
export default function SlotList() {
  const { slots } = useGame();

  return (
    <ul className="slots">
      {slots.map((slot, i) => (
        <Slot key={i} slot={slot} />
      ))}
    </ul>
  );
}
