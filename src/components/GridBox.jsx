import React, { useRef } from "react";
import { players } from "../data/playerdata";

import { useActivePlayer, useCounter } from "../contexts/GameContext";

function GridBox({ gridId, onGridClick, start, row, col }) {
  const button = useRef();
  const { count, setCount } = useCounter();
  const { activePlayer } = useActivePlayer();
  const updateAndCheck = () => {
    const index = row * 3 + col;
    activePlayer.clickIndex.push(index);

    if (button.current) {
      if (activePlayer.name === players.player1.name) {
        button.current.classList.add("bg-yellow-500");
      } else {
        button.current.classList.add("bg-black", "text-white");
      }
      button.current.textContent = activePlayer.Symbol;
      button.current.disabled = true;
    }

    onGridClick(gridId);
    setCount((count) => (count+=1));
    console.log(count);
  };

  const checkStart = () => {
    if (start) {
      updateAndCheck();
    }
  };

  return (
    <button
      ref={button}
      onClick={checkStart}
      className="border border-[#475569] flex items-center justify-center text-4xl font-retro font-bold"
    ></button>
  );
}

export default GridBox;
