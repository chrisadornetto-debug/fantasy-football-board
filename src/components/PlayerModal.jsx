function PlayerModal({ player, updatePlayer, onClose }) {

  if (!player) {
    return null;
  }

  const changePlayer = (field, value) => {
    updatePlayer({
      ...player,
      [field]: value
    });
  };

  return (
<div 
  className="modal-overlay"
  onClick={onClose}
>

<div
  className="modal"
  onClick={(e) => e.stopPropagation()}
>
<button
  className="close-button"
  onClick={onClose}
>
  ✖
</button>
        <h2>{player.name}</h2>

        <p>
          {player.team} • {player.position}
        </p>

        <hr />

        <label>
          Tier:

          <select
            value={player.tier}
            onChange={(e) =>
              changePlayer(
                "tier",
                Number(e.target.value)
              )
            }
          >
            <option value="1">Tier 1</option>
            <option value="2">Tier 2</option>
            <option value="3">Tier 3</option>
            <option value="4">Tier 4</option>
          </select>

        </label>


        <br /><br />


        <label>

          <input
            type="checkbox"
            checked={player.favorite}
            onChange={(e) =>
              changePlayer(
                "favorite",
                e.target.checked
              )
            }
          />

          Favorite ⭐

        </label>


        <h3>Notes</h3>

        <textarea
          rows="8"
          value={player.notes}
          onChange={(e) =>
            changePlayer(
              "notes",
              e.target.value
            )
          }
        />

      </div>

    </div>
  );
}

export default PlayerModal;