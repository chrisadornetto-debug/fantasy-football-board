import PlayerCard from "./PlayerCard";

function PositionColumn({ title, players, onPlayerClick }) {
  return (
    <div className="position-column">
      <h2>{title}</h2>

      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onClick={() => onPlayerClick(player)}
        />
      ))}
    </div>
  );
}

export default PositionColumn;