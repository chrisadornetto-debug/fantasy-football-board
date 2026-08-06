import TierSection from "./TierSection";

function PositionColumn({
  title,
  players,
  onPlayerClick,
  selectedPlayer,
}) {
  const tiers = [1, 2, 3, 4, 5];

  return (
    <div className="position-column">
      <h2>{title}</h2>

      <div className="tier-container">
        {tiers.map((tier) => {
          const tierPlayers = players
            .filter(
              (player) =>
                Number(player.tier) === tier
            )
            .sort(
              (a, b) =>
                (a.positionRank ?? a.rank) -
                (b.positionRank ?? b.rank)
            );

          return (
            <TierSection
              key={`${title}-${tier}`}
              tier={tier}
              position={title}
              players={tierPlayers}
              onPlayerClick={onPlayerClick}
              selectedPlayer={selectedPlayer}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PositionColumn;