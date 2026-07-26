function PlayerModal({ player, onClose }) {
  if (!player) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
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

        <p><strong>Team:</strong> {player.team}</p>
        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>Tier:</strong> {player.tier}</p>
        <p><strong>ADP:</strong> {player.adp}</p>

        <h3>Notes</h3>

        <textarea
          rows="6"
          placeholder="Write your notes..."
        />
      </div>
    </div>
  );
}

export default PlayerModal;