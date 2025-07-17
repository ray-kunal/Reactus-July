import { useEffect, useState, useRef } from "react";
import GridBox from "./components/GridBox";
import PlayerDetails from "./components/PlayerDetails";
import Navbar from "./components/Navbar";
import { players } from "./data/playerdata";
import {
  useCounter,
  useActivePlayer,
  useScoreDetails,
} from "./contexts/GameContext";

function App() {
  const main = useRef();
  const [start, setStart] = useState(false);
  const gridSize = 3;
  const [gridData, setGridData] = useState(
    Array(gridSize * gridSize).fill(null)
  );
  const [status, setStatus] = useState(null);

  const activePlayerElement = useRef([]);
  const boardRef = useRef();

  const { count, setCount } = useCounter();
  const { activePlayer, setActivePlayer } = useActivePlayer();
  const { updateScore } = useScoreDetails();

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleMoves = (moveTracker, gridId) => {
    moveTracker.rows.push(gridId[0]);
    moveTracker.cols.push(gridId[1]);
  };

  const checkWin = (arr) => {
    console.log("Checking win for:", arr);
    return winningCombos.some((combo) =>
      combo.every((cell) => arr.includes(cell))
    );
  };

  const handleGridClick = (gridId, index) => {
  if (gridData[index] !== null) return;
  
  const currentPlayer = activePlayer;

  const newGridData = [...gridData];
  newGridData[index] = currentPlayer.Symbol;
  setGridData(newGridData);
  
  if (currentPlayer.name === players.player1.name) {
    players.player1.currentPlayer = 0;
    players.player2.currentPlayer = 1;
    handleMoves(players.player1.moves, gridId);
    setActivePlayer(players.player2);
  } else {
    players.player1.currentPlayer = 1;
    players.player2.currentPlayer = 0;
    handleMoves(players.player2.moves, gridId);
    setActivePlayer(players.player1);
  }

  currentPlayer.clickIndex.push(index);

  if (checkWin(activePlayer.moves.rows) || checkWin(activePlayer.moves.cols)) {
    if (currentPlayer.name === players.player1.name) {
      updateScore("player1", "win");
      updateScore("player2", "loose");
    } else {
      updateScore("player2", "win");
      updateScore("player1", "loose");
    }
    setStatus("win");
  } else if (count === 8) { 
    updateScore("player1", "tie");
    updateScore("player2", "tie");
    setStatus("draw");
  }
};

  const resetGame = () => {
    setGridData(Array(gridSize * gridSize).fill(null));
    setStatus(null);
    setCount(0);
    const freshPlayer1 = {
      ...players.player1,
      moves: { rows: [], cols: [] },
      clickIndex: [],
    };

    const freshPlayer2 = {
      ...players.player2,
      moves: { rows: [], cols: [] },
      clickIndex: [],
    };

    players.player1 = freshPlayer1;
    players.player2 = freshPlayer2;
    setActivePlayer(freshPlayer1);
    // setStart(false);

    if (main.current) {
      main.current.classList.remove("left-active");
      main.current.classList.remove("right-active");
    }
  };

  useEffect(() => {
    if (!start) return;

    const updatePlayerUI = () => {
      if (!main.current) return;

      if (activePlayer.name === players.player1.name) {
        main.current.classList.remove("right-active");
        main.current.classList.add("left-active");
        activePlayerElement.current[0]?.classList.add("bg-[#9C0D38]");
        activePlayerElement.current[0]?.classList.remove("opacity");
        activePlayerElement.current[1]?.classList.add("opacity");
      } else {
        main.current.classList.remove("left-active");
        main.current.classList.add("right-active");
        activePlayerElement.current[1]?.classList.add("bg-[#55A1DC]");
        activePlayerElement.current[1]?.classList.remove("opacity");
        activePlayerElement.current[0]?.classList.add("opacity");
      }
    };

    updatePlayerUI();
  }, [activePlayer, start]);

  return (
    <div
      className="bg-gradient-to-br from-[#1a231f] via-[#223127] to-[#2c3b30] w-screen h-screen flex flex-col gap-[4rem] items-center main relative"
      ref={main}
    >
      <Navbar className="absolute top-0 left-0 w-[100%] border-2 border-white"/>
      <div
        className="w-[60%] h-[70%] bg-[#1C1F2A] p-4 flex flex-col items-center justify-start gap-8 shadow-lg rounded-xl"
        ref={boardRef}
      >
        <div className="grid grid-cols-3 grid-rows-3 w-[50%] h-[50%] border-2 bg-[#0e0d0d]">
          {[...Array(gridSize)].map((_, row) =>
            [...Array(gridSize)].map((_, col) => {
              const index = row * gridSize + col;
              return (
                <GridBox
                  key={`${row}-${col}`}
                  gridId={[row, col]}
                  value={gridData[index]}
                  onGridClick={(id) => {
                    handleGridClick(id, index);
                  }}
                  start={start}
                  row={row}
                  col={col}
                />
              );
            })
          )}
        </div>

        <div className="w-full flex-1 flex flex-col items-center justify-center gap-6 bg-[#0f172a]">
          {start ? (
            <div className="flex gap-4 w-full h-full">
              {(status === "win" || status === "draw") && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 justify-center items-center font-retro bg-[#000]  text-white w-[100%] h-[40%] text-center p-6">
                  {status === "win" ? (
                    <h2>
                      {activePlayer.name === players.player1.name
                        ? players.player2.name
                        : players.player1.name}{" "}
                      has won the match! 🎉
                    </h2>
                  ) : (
                    <h2>It's a draw 😐</h2>
                  )}
                  <button
                    className="font-retro glow-diagonal rounded-xl px-6 py-2 bg-yellow-500"
                    onClick={resetGame}
                  >
                    Restart Game
                  </button>
                </div>
              )}

              <div
                className="flex flex-col gap-4 text-white text-center font-retro flex-1 rounded-2xl"
                ref={(el) => (activePlayerElement.current[0] = el)}
              >
                <PlayerDetails player={players.player1} />
              </div>
              <div
                className="flex flex-col gap-4 text-white text-center font-retro flex-1 p-4 rounded-2xl"
                ref={(el) => (activePlayerElement.current[1] = el)}
              >
                <PlayerDetails player={players.player2} />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-white text-center font-retro p-4">
                Wanna play the cool game of TIC-TAC-TOE? Click below to start!
              </h1>
              <button
                className="font-retro glow-diagonal rounded-xl px-6 py-2 bg-green-500"
                onClick={() => setStart(true)}
              >
                Start Game
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
