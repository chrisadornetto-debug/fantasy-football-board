function PlayerCard({ player, onClick, isSelected }) {
  return (
<div
  className={`player-card ${isSelected ? "selected" : ""}`}
  onClick={onClick}
>
<span className="rank">
  #{player.positionRank}
</span>

  <span className="name">
    {player.name
      .split(" ")
      .map((part, index) =>
        index === 0 ? part[0] + "." : part
      )
      .join(" ")}
  </span>

  <span className="adp">
    {player.adp ?? "-"}
  </span>

  <span className="team-bye">
    {player.team}-{player.byeWeek ?? "-"}
  </span>

  <span className="tier">
    {player.tier}
  </span>

  
</div>
  );
}

export default PlayerCard;