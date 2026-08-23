function PlayerDetails({
  player,
  updatePlayer,
}) {
  if (!player) {
    return (
      <aside className="player-details">
        <h2>Player Details</h2>

        <p className="details-placeholder">
          Select a player to view and edit
          their details.
        </p>
      </aside>
    );
  }

  const numericFields = [
    "positionRank",
    "tier",
  ];

  const nullableNumericFields = [
    "adp",
    "byeWeek",
    "offensiveCoordinatorRank",
    "offensiveLineRank",
    "strengthOfScheduleRank",
  ];

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    let nextValue = value;

    if (type === "checkbox") {
      nextValue = checked;
    } else if (
      numericFields.includes(name)
    ) {
      nextValue = Number(value);
    } else if (
      nullableNumericFields.includes(name)
    ) {
      nextValue =
        value === ""
          ? null
          : Number(value);
    } else if (name === "team") {
      nextValue = value.toUpperCase();
    }

    updatePlayer({
      ...player,
      [name]: nextValue,
    });
  };

  const renderRatingSelect = (
    fieldName,
    label
  ) => (
    <label>
      {label}

      <select
        name={fieldName}
        value={player[fieldName] ?? ""}
        onChange={handleChange}
      >
        <option value="">
          Not evaluated
        </option>

        <option value="1">
          1 — Favorable
        </option>

        <option value="2">
          2 — Average
        </option>

        <option value="3">
          3 — Unfavorable
        </option>
      </select>
    </label>
  );

  return (
    <aside className="player-details">
      <h2>{player.name}</h2>

      {/* <label> 
        Name

        <input
          type="text"
          name="name"
          value={player.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Team

        <input
          type="text"
          name="team"
          value={player.team}
          maxLength={3}
          onChange={handleChange}
        />
      </label>

      <label>
        Position

        <select
          name="position"
          value={player.position}
          onChange={handleChange}
        >
          <option value="QB">QB</option>
          <option value="RB">RB</option>
          <option value="WR">WR</option>
          <option value="TE">TE</option>
        </select>
      </label>
*/}
      <label>
        Pos Rank

        <input
          type="number"
          name="positionRank"
          value={player.positionRank}
          min="1"
          onChange={handleChange}
        />
      </label>

      <label>
        Tier

        <select
          name="tier"
          value={player.tier}
          onChange={handleChange}
        >
          <option value="1">Tier 1</option>
          <option value="2">Tier 2</option>
          <option value="3">Tier 3</option>
          <option value="4">Tier 4</option>
          <option value="5">Tier 5</option>
          <option value="6">Tier 6</option>
          <option value="7">Tier 7</option>
          <option value="8">Tier 8</option>

          
        </select>
      </label>

      {renderRatingSelect(
        "offensiveCoordinatorRank",
        "O Coord"
      )}

      {renderRatingSelect(
        "offensiveLineRank",
        "O Line"
      )}

      {renderRatingSelect(
        "strengthOfScheduleRank",
        "SOS"
      )}

<div className="checkbox-grid">
<label className="checkbox-label">
  <input
    type="checkbox"
    name="injuryProne"
    checked={player.injuryProne ?? false}
    onChange={handleChange}
  />
  Injury Prone
</label>

<label className="checkbox-label">
  <input
    type="checkbox"
    name="rbbc"
    checked={player.rbbc ?? false}
    onChange={handleChange}
  />
  RBBC
</label>

<label className="checkbox-label">
  <input
    type="checkbox"
    name="badQB"
    checked={player.badQB ?? false}
    onChange={handleChange}
  />
  Bad QB
</label>

<label className="checkbox-label">
  <input
    type="checkbox"
    name="badWRs"
    checked={player.badWRs ?? false}
    onChange={handleChange}
  />
  Bad WRs
</label>

<label className="checkbox-label">
  <input
    type="checkbox"
    name="fade"
    checked={player.fade ?? false}
    onChange={handleChange}
  />
  Fade
</label>
</div>

<label>
  Notes

  <textarea
    name="notes"
    value={player.notes ?? ""}
    onChange={handleChange}
  />
</label>
    </aside>
  );
}

export default PlayerDetails;