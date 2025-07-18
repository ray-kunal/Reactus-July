import React, { useEffect, useState } from "react";
import { players } from "../data/playerdata";
import {
  useActivePlayer,
  useCounter,
  useGameStatus,
} from "../contexts/GameContext";

function GridBox({ gridId, onGridClick, start, row, col, value }) {
  const { count, setCount } = useCounter();
  const { activePlayer } = useActivePlayer();
  const { status } = useGameStatus();
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (status === "win" || status === "draw") {
      setDisplayValue(" ");
    } else {
      setDisplayValue(value);
    }
  }, [status, value]);

  const updateAndCheck = () => {
    const index = row * 3 + col;
    activePlayer.clickIndex.push(index);
    onGridClick(gridId);
    setCount((count) => count + 1);
  };

  const checkStart = () => {
    if(status !== "playing") return;
    if (start && !value) {
      updateAndCheck();
    }
  };
  const getButtonStyles = () => {
    if (displayValue === null || displayValue === " ") {
      return "border border-[#ffffff] flex items-center justify-center text-[clamp(1.5rem,6vw,4rem)] font-retro font-bold";
    }
    if(displayValue === value){
      if (value === players.player1.Symbol) {
      return "border border-[#ffffff] flex items-center justify-center text-[clamp(1.5rem,6vw,4rem)] font-retro font-bold bg-white text-red-600";
    } else {
      return "border border-[#ffffff] flex items-center justify-center text-[clamp(1.5rem,6vw,4rem)] font-retro font-bold bg-black text-white";
    }
    }
  };
  return (
    <button
      onClick={checkStart}
      disabled={!!value || status !== "playing"} 
      className={getButtonStyles()}
    >
      {displayValue}
    </button>
  );
}

export default GridBox;
