import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  useDroppable,
} from "@dnd-kit/core";

import SortablePlayerCard from "./SortablePlayerCard";


function TierSection({
  tier,
  players,
  position,
  onPlayerClick,
  selectedPlayer,
}) {

  const {
    setNodeRef,
  } = useDroppable({
    id: `tier-${position}-${tier}`,
  });


  return (
    <div
      ref={setNodeRef}
      className="tier-section"
    >


      <h3>
        Tier {tier}
      </h3>

      <SortableContext
        items={players.map(
          player => player.id
        )}
        strategy={verticalListSortingStrategy}
      >

        <div className="tier-players">

          {players.map(player => (

            <SortablePlayerCard
              key={player.id}
              player={player}
              onClick={() =>
                onPlayerClick(player)
              }
              isSelected={
                selectedPlayer?.id === player.id
              }
            />

          ))}

        </div>

      </SortableContext>

    </div>
  );
}

export default TierSection;