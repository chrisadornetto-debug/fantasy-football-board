
import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PositionColumn from "./components/PositionColumn";
import PlayerDetails from "./components/PlayerDetails";

import playerData from "./data/players";

function App() {
  const [players, setPlayers] = useState(() => {
  const savedPlayers = localStorage.getItem("players");

  return savedPlayers
    ? JSON.parse(savedPlayers)
    : playerData;
});

  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

useEffect(() => {
  localStorage.setItem(
    "players",
    JSON.stringify(players)
  );
}, [players]);

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

const handleReorder = (
  activeId,
  overId,
  position,
  newTier
) => {

  setPlayers((currentPlayers) => {

    return currentPlayers.map(player => {

      if (player.id === activeId) {

        return {
          ...player,
          tier: newTier ?? player.tier,
        };

      }

      return player;

    });

  });

};

const resetPlayers = () => {
    localStorage.removeItem("players");
    setPlayers(playerData);
    setSelectedPlayer(null);
  };

  
return (
  <>
    <Header onReset={resetPlayers} />

    <SearchBar
      value={search}
      onChange={setSearch}
    />

    <div className="main-layout">

      <div className="board">
        {positions.map((position) => (
<PositionColumn
  key={position}
  title={position}
  players={players.filter(
    player =>
      player.position === position &&
      player.name
        .toLowerCase()
        .includes(search.toLowerCase())
  )}
  onPlayerClick={setSelectedPlayer}
  selectedPlayer={selectedPlayer}
  onReorder={handleReorder}
/>
        ))}
      </div>

      <PlayerDetails
        player={selectedPlayer}
        updatePlayer={updatePlayer}
      />

    </div>
  </>
);
}
export default App;