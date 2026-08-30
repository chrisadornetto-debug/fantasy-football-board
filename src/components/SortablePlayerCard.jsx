import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

function SortablePlayerCard({
  player,
  onPlayerClick,
  selectedPlayer,
   onToggleDrafted,
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

const indicators = [];


/* ===========================
   Offensive Coordinator
   All positions
=========================== */

if (player.offensiveCoordinatorRank === 1) {
  indicators.push({
    type: "good",
    label: "OC",
    title: "OC: Favorable",
  });
} else if (player.offensiveCoordinatorRank === 3) {
  indicators.push({
    type: "warn",
    label: "OC",
    title: "OC: Unfavorable",
  });
}


/* ===========================
   Offensive Line
   Do NOT show for WR
=========================== */

if (player.position !== "WR") {
  if (player.offensiveLineRank === 1) {
    indicators.push({
      type: "good",
      label: "OL",
      title: "OL: Favorable",
    });
  } else if (player.offensiveLineRank === 3) {
    indicators.push({
      type: "warn",
      label: "OL",
      title: "OL: Unfavorable",
    });
  }
}


/* ===========================
   Injury Prone
   All positions
=========================== */

if (player.injuryProne) {
  indicators.push({
    type: "warn",
    label: "INJ",
    title: "Injury Prone",
  });
}


/* ===========================
   RBBC
   RB only
=========================== */

if (
  player.position === "RB" &&
  player.rbbc
) {
  indicators.push({
    type: "warn",
    label: "RBBC",
    title: "RBBC",
  });
}


/* ===========================
   Bad QB
   WR and TE only
=========================== */

if (
  ["WR", "TE"].includes(player.position) &&
  player.badQB
) {
  indicators.push({
    type: "warn",
    label: "BAD-QB",
    title: "Bad QB",
  });
}


/* ===========================
   Bad WRs
   QB only
=========================== */

if (
  player.position === "QB" &&
  player.badWRs
) {
  indicators.push({
    type: "warn",
    label: "BAD-WR",
    title: "Bad WRs",
  });
}
  return (
    <div
      ref={setNodeRef}
      style={style}
     className={`player-card ${
  selectedPlayer?.id === player.id
    ? "selected"
    : ""
} ${
  player.fade
    ? "fade"
    : ""
} ${
  player.target
    ? "target"
    : ""
} ${
  player.drafted
    ? "drafted"
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
        {player.positionRank}
      </span>

      <span className="name">
        {displayName}
      </span>

      <span className="adp">
        {player.adp ?? "-"}
      </span>

      <span className="team-bye">
        {player.team}-{player.byeWeek ?? "-"}
      </span>


<div className="player-indicators">
  {indicators.map((indicator, index) => (
    <span
      key={`${indicator.label}-${index}`}
      className="indicator-wrapper"
    >
      <span
        className={`indicator indicator-${indicator.type}`}
      />

      <span className="indicator-tooltip">
        {indicator.title}
      </span>
    </span>
    
  ))}
  <button
  type="button"
  className={`drafted-check ${
    player.drafted ? "is-drafted" : ""
  }`}
  title={
    player.drafted
      ? "Mark as available"
      : "Mark as drafted"
  }
  aria-label={
    player.drafted
      ? `Mark ${player.name} as available`
      : `Mark ${player.name} as drafted`
  }
  onClick={(event) => {
    event.stopPropagation();
    onToggleDrafted(player.id);
  }}
>
  ✓
</button>
</div>
    </div>
  );
}



export default SortablePlayerCard;