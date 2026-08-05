import {
  useSortable
} from "@dnd-kit/sortable";

import {
  CSS
} from "@dnd-kit/utilities";


function SortablePlayerCard({
  player,
  onClick,
  isSelected
}) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: player.id
  });


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <div
      ref={setNodeRef}
      style={style}

      {...attributes}

      className={`player-card ${
        isSelected ? "selected" : ""
      }`}

      onClick={onClick}
    >

      <span
        className="drag-handle"
        {...listeners}
      >
        ☰
      </span>

      <span className="rank">
        #{player.positionRank || player.rank}
      </span>

      <span className="name">
        {player.name
          .split(" ")
          .map((part,index) =>
            index === 0
              ? `${part.charAt(0)}.`
              : part
          )
          .join(" ")
        }
      </span>

      <span className="team">
        {player.team}
      </span>

      <span className="bye">
        {player.byeWeek ? `B${player.byeWeek}` : ""}
      </span>


    </div>
  );
}


export default SortablePlayerCard;