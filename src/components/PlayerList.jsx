import players from "../data/players";
import PlayerCard from "./PlayerCard";

function PlayerList() {
  return (
    <div className="player-list">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
        />
      ))}
    </div>
  );
}

export default PlayerList;