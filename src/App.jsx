import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";

import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PositionColumn from "./components/PositionColumn";
import PlayerDetails from "./components/PlayerDetails";

import playerData from "./data/players";


const getDefaultTier = (positionRank) => {
  if (positionRank <= 2) return 1;
  if (positionRank <= 5) return 2;
  if (positionRank <= 8) return 3;
  if (positionRank <= 12) return 4;

  return 5;
};

const normalizePlayers = (sourcePlayers) =>
  sourcePlayers.map((player, index) => {
    const positionRank = Number(
      player.positionRank ?? player.rank ?? index + 1
    );

    const existingTier = Number(player.tier);

    return {
      ...player,
      positionRank,
      tier:
        existingTier >= 1 && existingTier <= 5
          ? existingTier
          : getDefaultTier(positionRank),
    };
  });

function App() {
  const [players, setPlayers] = useState(() => {
  const savedPlayers = localStorage.getItem("players");

  const startingPlayers = savedPlayers
    ? JSON.parse(savedPlayers)
    : playerData;

  return normalizePlayers(startingPlayers);
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

const handleDragEnd = ({ active, over }) => {
  if (!over || active.id === over.id) return;

  setPlayers((currentPlayers) => {
    const activePlayer = currentPlayers.find(
      (player) => player.id === active.id
    );

    if (!activePlayer) {
      return currentPlayers;
    }

    const overType = over.data.current?.type;

    const overPlayer =
      overType === "player"
        ? currentPlayers.find(
            (player) => player.id === over.id
          )
        : null;

    const targetPosition =
      over.data.current?.position ??
      overPlayer?.position ??
      activePlayer.position;

    // Prevent moving players between position columns.
    if (targetPosition !== activePlayer.position) {
      return currentPlayers;
    }

    const targetTier =
      overType === "tier"
        ? Number(over.data.current?.tier)
        : overPlayer?.tier ?? activePlayer.tier;

    const positionPlayers = currentPlayers
      .filter(
        (player) =>
          player.position === activePlayer.position
      )
      .sort(
        (a, b) =>
          (a.positionRank ?? a.rank) -
          (b.positionRank ?? b.rank)
      );

    let reorderedPositionPlayers;

    /*
     * Reorder inside the same tier.
     */
    if (
      overPlayer &&
      overPlayer.tier === activePlayer.tier
    ) {
      const oldIndex = positionPlayers.findIndex(
        (player) => player.id === active.id
      );

      const newIndex = positionPlayers.findIndex(
        (player) => player.id === over.id
      );

      if (oldIndex === -1 || newIndex === -1) {
        return currentPlayers;
      }

      reorderedPositionPlayers = arrayMove(
        positionPlayers,
        oldIndex,
        newIndex
      );
    } else {
      /*
       * Move into a different tier.
       */
      reorderedPositionPlayers =
        positionPlayers.filter(
          (player) => player.id !== active.id
        );

      const movedPlayer = {
        ...activePlayer,
        tier: targetTier,
      };

      let insertionIndex;

      if (overPlayer) {
        insertionIndex =
          reorderedPositionPlayers.findIndex(
            (player) => player.id === overPlayer.id
          );

        if (insertionIndex === -1) {
          insertionIndex =
            reorderedPositionPlayers.length;
        }
      } else {
        const lastPlayerInTargetTier =
          reorderedPositionPlayers.reduce(
            (lastIndex, player, index) =>
              player.tier === targetTier
                ? index
                : lastIndex,
            -1
          );

        if (lastPlayerInTargetTier !== -1) {
          insertionIndex =
            lastPlayerInTargetTier + 1;
        } else {
          const firstLaterTierIndex =
            reorderedPositionPlayers.findIndex(
              (player) =>
                player.tier > targetTier
            );

          insertionIndex =
            firstLaterTierIndex === -1
              ? reorderedPositionPlayers.length
              : firstLaterTierIndex;
        }
      }

      reorderedPositionPlayers.splice(
        insertionIndex,
        0,
        movedPlayer
      );
    }

    const rankedPositionPlayers =
      reorderedPositionPlayers.map(
        (player, index) => ({
          ...player,
          positionRank: index + 1,
        })
      );

    /*
     * Rebuild the saved array using the new QB/RB/WR/TE
     * order instead of preserving the old source order.
     */
    let positionIndex = 0;

    return currentPlayers.map((player) => {
      if (
        player.position !== activePlayer.position
      ) {
        return player;
      }

      const replacement =
        rankedPositionPlayers[positionIndex];

      positionIndex += 1;

      return replacement;
    });
  });
};

const resetPlayers = () => {
  const freshPlayers = normalizePlayers(playerData);

  setPlayers(freshPlayers);
  setSelectedPlayer(null);
  setSearch("");

  localStorage.setItem(
    "players",
    JSON.stringify(freshPlayers)
  );
};
  
return (
  <>
    <Header onReset={resetPlayers} />

    <SearchBar
      value={search}
      onChange={setSearch}
    />

    <div className="main-layout">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="board">
          {positions.map((position) => (
            <PositionColumn
              key={position}
              title={position}
              players={players.filter(
                (player) =>
                  player.position === position &&
                  player.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )}
              onPlayerClick={setSelectedPlayer}
              selectedPlayer={selectedPlayer}
            />
          ))}
        </div>
      </DndContext>

      <PlayerDetails
        player={selectedPlayer}
        updatePlayer={updatePlayer}
      />
    </div>
  </>
);
}

export default App;