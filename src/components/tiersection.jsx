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

  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: tierId,
  });

  return (
    <section
      ref={setNodeRef}
      className={`tier-section ${
        isOver ? "tier-over" : ""
      }`}
    >
      <div className="tier-header">
        Tier {tier}
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