
import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PositionColumn from "./components/PositionColumn";
import PlayerModal from "./components/PlayerModal";

import playerData from "./data/players";

function App() {
  const [players, setPlayers] = useState(playerData);
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const positions = ["QB", "RB", "WR", "TE"];

const updatePlayer = (updatedPlayer) => {
  setPlayers((currentPlayers) =>
    currentPlayers.map((player) =>
      player.id === updatedPlayer.id
        ? updatedPlayer
        : player
    )
  );

  setSelectedPlayer(updatedPlayer);
};
  return (
    <>
      <Header />

      <SearchBar
    value={search}
    onChange={setSearch}
/>

      <div className="board">
        {positions.map((position) => (
          <PositionColumn
            key={position}
            title={position}
            players={players.filter(player =>
    player.position === position &&
    player.name
        .toLowerCase()
        .includes(search.toLowerCase())
)}
            onPlayerClick={setSelectedPlayer}
          />
        ))}
      </div>

<PlayerModal
  player={selectedPlayer}
  updatePlayer={updatePlayer}
    onClose={() => setSelectedPlayer(null)}
/>
    </>
  );
}

export default App;