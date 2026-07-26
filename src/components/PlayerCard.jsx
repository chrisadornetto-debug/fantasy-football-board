function PlayerCard({ player, onClick }) {
  return (
    <div
      className="player-card"
      onClick={onClick}
    >
      <div className="player-name">
        {player.name}
      </div>

      <div className="player-info">
        {player.team} • {player.position}
      </div>
    </div>
  );
}

export default PlayerCard;