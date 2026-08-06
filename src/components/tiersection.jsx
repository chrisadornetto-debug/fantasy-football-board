import { useDroppable } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortablePlayerCard from "./SortablePlayerCard";

function TierSection({
  tier,
  position,
  players,
  onPlayerClick,
  selectedPlayer,
}) {
  const tierId = `tier-${position}-${tier}`;

  const { setNodeRef, isOver } = useDroppable({
    id: tierId,
    data: {
      type: "tier",
      position,
      tier,
    },
  });

  return (
    <section
      ref={setNodeRef}
      className={`tier-section ${
        isOver ? "tier-over" : ""
      }`}
    >
      <div className="tier-header">
        <span>Tier {tier}</span>

        <span className="tier-count">
          {players.length}
        </span>
      </div>

      <SortableContext
        items={players.map((player) => player.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="tier-player-list">
          {players.map((player) => (
            <SortablePlayerCard
              key={player.id}
              player={player}
              onPlayerClick={onPlayerClick}
              selectedPlayer={selectedPlayer}
            />
          ))}
        </div>
      </SortableContext>
    </section>
  );
}

export default TierSection;