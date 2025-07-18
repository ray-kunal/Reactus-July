import { createContext, useState, useContext } from "react";
import "../data/playerdata";
import { players } from "../data/playerdata";

const CounterContext = createContext();
export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};
export const useCounter = () => useContext(CounterContext);

const ActivePlayer = createContext();
export const PlayerProvider = ({ children }) => {
  const [activePlayer, setActivePlayer] = useState({...players.player1});

  return (
    <ActivePlayer.Provider value={{ activePlayer, setActivePlayer }}>
      {children}
    </ActivePlayer.Provider>
  );
};
export const useActivePlayer = () => useContext(ActivePlayer);

const GameStatus = createContext();
export const GameStatusProvider = ({ children }) => {
  const [status, setStatus] = useState("playing");

  return (
    <GameStatus.Provider value={{ status, setStatus }}>
      {children}
    </GameStatus.Provider>
  );
};
export const useGameStatus = () => useContext(GameStatus);

const ScoreDetails = createContext();
export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({
    player1: { win: 0, loose: 0, tie: 0 },
    player2: { win: 0, loose: 0, tie: 0 },
  });

  const updateScore = (playerKey, field)=>{
    setScores((prev) =>( {
      ...prev,
    [playerKey] : {
      ...prev[playerKey],
      [field] : prev[playerKey][field] + 1
    }
    }))
  }
  return(
    <ScoreDetails.Provider value = {{scores,updateScore}}>
      {children}
    </ScoreDetails.Provider>
  )
};
export const useScoreDetails = ()=>useContext(ScoreDetails)


export const GameContext = ({ children }) => (
  <PlayerProvider>
    <CounterProvider>
      <ScoreProvider>
        <GameStatusProvider>
          {children}
        </GameStatusProvider>
      </ScoreProvider>
    </CounterProvider>
  </PlayerProvider>
);
