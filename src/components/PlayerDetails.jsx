function PlayerDetails({ player, updatePlayer }) {

  if (!player) {
    return (
      <aside className="player-details">
        <h2>Player Details</h2>
        <p>Select a player.</p>
      </aside>
    );
  }


  const changePlayer = (field, value) => {
    updatePlayer({
      ...player,
      [field]: value
    });
  };


  return (
    <aside className="player-details">

      <h2>{player.name}</h2>

      <p>
        {player.team} • {player.position} • Bye: {player.byeWeek}
      </p>

      <hr />
    
          <label>
        Overall Rank:  
        <input
          type="number"
          value={player.rank || ""}
          onChange={(e) =>
            changePlayer(
              "rank",
              Number(e.target.value)
            )
          }
        />
      </label>


      <br />

<p>
      <label>
        <strong>Tier:  </strong>  
        <select
          value={player.tier || 1}
          onChange={(e) =>
            changePlayer(
              "tier",
              Number(e.target.value)
            )
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
     </label>
</p>
 
       <p>
        <strong>ADP:</strong>{" "}
        {player.ADP || "—"}
      </p>


<p>
      <label>
        <input
          type="checkbox"
          checked={player.favorite || false}
          onChange={(e) =>
            changePlayer(
              "favorite",
              e.target.checked
            )
          }
        />
      Favorite
      </label>
</p>

      <p>
        <strong>Offensive Coordinator:</strong>{" "}
        {player.offensiveCoordinator || "—"}
      </p>

      <p>
        <strong>Offensive Rank:</strong>{" "}
        {player.offensiveRank || "—"}
      </p>


  <h3>Notes</h3>

      <textarea
        rows="8"
        value={player.notes || ""}
        onChange={(e) =>
          changePlayer(
            "notes",
            e.target.value
          )
        }
      />

    </aside>
  );
}

export default PlayerDetails;
