function PlayerCard({ player, onClick, isSelected }) {
  return (
<div
  className={`player-card ${isSelected ? "selected" : ""}`}
  onClick={onClick}
>
  <span className="rank">
    #{player.positionRank || player.rank}
  </span>

  <span className="name">
    {player.name
      .split(" ")
      .map((part, index) =>
        index === 0 ? part[0] + "." : part
      )
      .join(" ")}
  </span>

  <span className="team">
    {player.team}
  </span>

  <span className="bye">
    B{player.byeWeek}
  </span>

  <span className="tier">
    T{player.tier}
  </span>

  
</div>
  );
}

export default PlayerCard;