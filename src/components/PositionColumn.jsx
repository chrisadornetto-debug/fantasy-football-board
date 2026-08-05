import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import TierSection from "./TierSection";


function PositionColumn({
  title,
  players,
  onPlayerClick,
  selectedPlayer,
  onReorder,
}) {

  const tiers = [1, 2, 3, 4, 5];


function handleDragEnd(event) {
  const {
    active,
    over,
  } = event;


  if (!over) return;


  const activeId = active.id;
  const overId = over.id;


  let newTier = null;


  // Dropped directly onto a tier section
  if (
    typeof overId === "string" &&
    overId.startsWith("tier-")
  ) {

    const parts = overId.split("-");

    newTier = Number(parts[2]);

  }


  onReorder(
    activeId,
    overId,
    title,
    newTier
  );
}


  return (
    <div className="position-column">

      <h2>{title}</h2>


      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

        <div className="tier-container">

          {tiers.map((tier) => (

           <TierSection
  key={tier}
  tier={tier}
  position={title}
  players={
    players.filter(
      player =>
        player.tier === tier
    )
  }
  onPlayerClick={onPlayerClick}
  selectedPlayer={selectedPlayer}
/>

          ))}

        </div>

      </DndContext>

    </div>
  );
}


export default PositionColumn;