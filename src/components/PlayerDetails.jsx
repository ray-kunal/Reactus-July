import { players } from "../data/playerdata";
import { useScoreDetails } from "../contexts/GameContext";
import "../data/playerdata"


function PlayerDetails({ player }) {
  // const {activePlayer} = useActivePlayer()
  const {scores} = useScoreDetails()
  const playerKey = player.name === "PLAYER 1" ? 'player1' : 'player2'
  const playerStats = scores[playerKey]
  return (
    <>
      <div className="text-2xl p-2">{player.name}</div>
      <div className="flex flex-col gap-[0.5rem] flex-1 p-2">
        <h1 className="w-[100%] text-left text-xl">
          wins:{playerStats.win}
        </h1>
        <h1 className="w-[100%] text-left text-xl">
          loss:{playerStats.loose}
        </h1>
        <h1 className="w-[100%] text-left text-xl">
          symbol: {player.Symbol}
        </h1>
        <h1 className="w-[100%] text-left text-xl">Tie:{playerStats.tie}</h1>
      </div>
    </>
  );
}

export default PlayerDetails;
