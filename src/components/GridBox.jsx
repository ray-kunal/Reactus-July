import React from "react";
import { players } from "../data/playerdata";
import { useActivePlayer, useCounter } from "../contexts/GameContext";

function GridBox({ gridId, onGridClick, start, row, col, value }) {
  const { count, setCount } = useCounter();
  const { activePlayer } = useActivePlayer();
  
  const updateAndCheck = () => {
    const index = row * 3 + col;
    activePlayer.clickIndex.push(index);
    onGridClick(gridId);
    setCount((count) => count + 1);
  };
  
  const checkStart = () => {
    if (start && !value) { // Only allow click if started and cell is empty
      updateAndCheck();
    }
  };
  
  // Determine styling based on the value
  const getButtonStyles = () => {
    if (!value) {
      return "border border-[#ffffff] flex items-center justify-center text-4xl font-retro font-bold";
    }
    
    if (value === players.player1.Symbol) {
      return "border border-[#ffffff] flex items-center justify-center text-4xl font-retro font-bold bg-white text-red-600";
    } else {
      return "border border-[#ffffff] flex items-center justify-center text-4xl font-retro font-bold bg-black text-white";
    }
  };
  
  return (
    <button
      onClick={checkStart}
      disabled={!!value} // Disable if there's already a value
      className={getButtonStyles()}
    >
      {value}
    </button>
  );
}

export default GridBox;