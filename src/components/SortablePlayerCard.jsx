import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

function SortablePlayerCard({
  player,
  onPlayerClick,
  selectedPlayer,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: player.id,
    data: {
      type: "player",
      playerId: player.id,
      position: player.position,
      tier: player.tier,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
    zIndex: isDragging ? 10 : "auto",
    position: "relative",
  };

  const displayName = player.name
    .split(" ")
    .map((part, index) =>
      index === 0 ? `${part[0]}.` : part
    )
    .join(" ");

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`player-card ${
        selectedPlayer?.id === player.id
          ? "selected"
          : ""
      }`}
      onClick={() => onPlayerClick(player)}
    >
      <button
        type="button"
        className="drag-handle"
        aria-label={`Drag ${player.name}`}
        onClick={(event) => event.stopPropagation()}
        {...attributes}
        {...listeners}
      >
        ⋮⋮
      </button>

      <span className="rank">
        #{player.positionRank ?? player.rank}
      </span>

      <span className="name">
        {displayName}
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

export default SortablePlayerCard;