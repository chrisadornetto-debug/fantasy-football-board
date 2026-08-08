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

import {
  exportPlayersToCsv,
  importPlayersFromCsv,
} from "./utils/csv";


/* ===========================
   Constants
=========================== */

const VALID_POSITIONS = [
  "QB",
  "RB",
  "WR",
  "TE",
];


/* ===========================
   Player Normalization
=========================== */

const getDefaultTier = (positionRank) => {
  if (positionRank <= 2) return 1;
  if (positionRank <= 5) return 2;
  if (positionRank <= 8) return 3;
  if (positionRank <= 12) return 4;

  return 5;
};


const toNullableNumber = (value) => {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
};


const normalizeRating = (value) => {
  const number = Number(value);

  return [1, 2, 3].includes(number)
    ? number
    : null;
};


const normalizePlayer = (
  player,
  fallbackPositionRank = 1
) => {
  const position = VALID_POSITIONS.includes(
    player.position
  )
    ? player.position
    : "QB";

  const parsedPositionRank = Number(
    player.positionRank
  );

  const positionRank =
    Number.isInteger(parsedPositionRank) &&
    parsedPositionRank > 0
      ? parsedPositionRank
      : fallbackPositionRank;

  const parsedTier = Number(player.tier);

  const tier =
    Number.isInteger(parsedTier) &&
    parsedTier >= 1 &&
    parsedTier <= 5
      ? parsedTier
      : getDefaultTier(positionRank);

  return {
    id: player.id,
    name: player.name ?? "",
    team: (player.team ?? "").toUpperCase(),
    position,

    positionRank,
    tier,

    adp: toNullableNumber(player.adp),

    byeWeek: toNullableNumber(
      player.byeWeek
    ),

    offensiveCoordinatorRank:
      normalizeRating(
        player.offensiveCoordinatorRank
      ),

    offensiveLineRank:
      normalizeRating(
        player.offensiveLineRank
      ),

    strengthOfScheduleRank:
      normalizeRating(
        player.strengthOfScheduleRank
      ),

    injuryProne:
      player.injuryProne === true ||
      player.injuryProne === "true",

    notes: player.notes ?? "",
  };
};


const normalizePlayers = (sourcePlayers) => {
  const positionCounts = {
    QB: 0,
    RB: 0,
    WR: 0,
    TE: 0,
  };

  return sourcePlayers.map((player) => {
    const position = VALID_POSITIONS.includes(
      player.position
    )
      ? player.position
      : "QB";

    positionCounts[position] += 1;

    return normalizePlayer(
      {
        ...player,
        position,
      },
      positionCounts[position]
    );
  });
};


/* ===========================
   Saved Data Migration
=========================== */

const mergeSavedPlayersWithDefaults = (
  savedPlayers
) => {
  const defaultsById = new Map(
    playerData.map((player) => [
      String(player.id),
      player,
    ])
  );

  const savedIds = new Set(
    savedPlayers.map((player) =>
      String(player.id)
    )
  );

  const migratedSavedPlayers =
    savedPlayers.map((savedPlayer) => ({
      ...defaultsById.get(
        String(savedPlayer.id)
      ),
      ...savedPlayer,
    }));

  const newDefaultPlayers =
    playerData.filter(
      (defaultPlayer) =>
        !savedIds.has(
          String(defaultPlayer.id)
        )
    );

  return [
    ...migratedSavedPlayers,
    ...newDefaultPlayers,
  ];
};


const loadPlayers = () => {
  const savedPlayers =
    localStorage.getItem("players");

  if (!savedPlayers) {
    return normalizePlayers(playerData);
  }

  try {
    const parsedPlayers =
      JSON.parse(savedPlayers);

    if (!Array.isArray(parsedPlayers)) {
      return normalizePlayers(playerData);
    }

    return normalizePlayers(
      mergeSavedPlayersWithDefaults(
        parsedPlayers
      )
    );
  } catch {
    return normalizePlayers(playerData);
  }
};


/* ===========================
   App
=========================== */

function App() {
  const [players, setPlayers] =
    useState(loadPlayers);

  const [search, setSearch] =
    useState("");

  const [
    selectedPlayer,
    setSelectedPlayer,
  ] = useState(null);


  /* ===========================
     Save to Local Storage
  =========================== */

  useEffect(() => {
    localStorage.setItem(
      "players",
      JSON.stringify(players)
    );
  }, [players]);


  const positions = [
    "QB",
    "RB",
    "WR",
    "TE",
  ];


  /* ===========================
     Update Player
  =========================== */

  const updatePlayer = (updatedPlayer) => {
    const normalizedPlayer =
      normalizePlayer(
        updatedPlayer,
        updatedPlayer.positionRank
      );

    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        String(player.id) ===
        String(normalizedPlayer.id)
          ? normalizedPlayer
          : player
      )
    );

    setSelectedPlayer(normalizedPlayer);
  };


  /* ===========================
     Drag and Drop
  =========================== */

  const handleDragEnd = ({
    active,
    over,
  }) => {
    if (!over || active.id === over.id) {
      return;
    }

    setPlayers((currentPlayers) => {
      const activePlayer =
        currentPlayers.find(
          (player) =>
            player.id === active.id
        );

      if (!activePlayer) {
        return currentPlayers;
      }

      const overType =
        over.data.current?.type;

      const overPlayer =
        overType === "player"
          ? currentPlayers.find(
              (player) =>
                player.id === over.id
            )
          : null;

      const targetPosition =
        over.data.current?.position ??
        overPlayer?.position ??
        activePlayer.position;


      // Do not allow players to move
      // between position columns.
      if (
        targetPosition !==
        activePlayer.position
      ) {
        return currentPlayers;
      }


      const targetTier =
        overType === "tier"
          ? Number(
              over.data.current?.tier
            )
          : overPlayer?.tier ??
            activePlayer.tier;


      const positionPlayers =
        currentPlayers
          .filter(
            (player) =>
              player.position ===
              activePlayer.position
          )
          .sort(
            (a, b) =>
              a.positionRank -
              b.positionRank
          );


      let reorderedPositionPlayers;


      /* ===========================
         Reorder Within Same Tier
      =========================== */

      if (
        overPlayer &&
        overPlayer.tier ===
          activePlayer.tier
      ) {
        const oldIndex =
          positionPlayers.findIndex(
            (player) =>
              player.id === active.id
          );

        const newIndex =
          positionPlayers.findIndex(
            (player) =>
              player.id === over.id
          );


        if (
          oldIndex === -1 ||
          newIndex === -1
        ) {
          return currentPlayers;
        }


        reorderedPositionPlayers =
          arrayMove(
            positionPlayers,
            oldIndex,
            newIndex
          );
      }


      /* ===========================
         Move Between Tiers
      =========================== */

      else {
        reorderedPositionPlayers =
          positionPlayers.filter(
            (player) =>
              player.id !== active.id
          );


        const movedPlayer = {
          ...activePlayer,
          tier: targetTier,
        };


        let insertionIndex;


        // Dropped onto another player.
        if (overPlayer) {
          insertionIndex =
            reorderedPositionPlayers.findIndex(
              (player) =>
                player.id ===
                overPlayer.id
            );


          if (insertionIndex === -1) {
            insertionIndex =
              reorderedPositionPlayers.length;
          }
        }


        // Dropped directly onto a tier.
        else {
          const lastPlayerInTargetTier =
            reorderedPositionPlayers.reduce(
              (
                lastIndex,
                player,
                index
              ) =>
                player.tier === targetTier
                  ? index
                  : lastIndex,
              -1
            );


          if (
            lastPlayerInTargetTier !== -1
          ) {
            insertionIndex =
              lastPlayerInTargetTier + 1;
          } else {
            const firstLaterTierIndex =
              reorderedPositionPlayers.findIndex(
                (player) =>
                  player.tier >
                  targetTier
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


      /* ===========================
         Recalculate Position Rank
      =========================== */

      const rankedPositionPlayers =
        reorderedPositionPlayers.map(
          (player, index) => ({
            ...player,
            positionRank: index + 1,
          })
        );


      /* ===========================
         Rebuild Main Player Array
      =========================== */

      let positionIndex = 0;


      return currentPlayers.map(
        (player) => {
          if (
            player.position !==
            activePlayer.position
          ) {
            return player;
          }


          const replacement =
            rankedPositionPlayers[
              positionIndex
            ];


          positionIndex += 1;


          return replacement;
        }
      );
    });
  };


  /* ===========================
     Reset Board
  =========================== */

  const resetPlayers = () => {
    const freshPlayers =
      normalizePlayers(playerData);

    setPlayers(freshPlayers);
    setSelectedPlayer(null);
    setSearch("");

    localStorage.setItem(
      "players",
      JSON.stringify(freshPlayers)
    );
  };


  /* ===========================
     Export CSV
  =========================== */

  const handleExportCsv = () => {
    exportPlayersToCsv(players);
  };


  /* ===========================
     Import CSV
  =========================== */

  const handleImportCsv = async (file) => {
    try {
      const importedPlayers =
        await importPlayersFromCsv(file);

      const normalizedPlayers =
        normalizePlayers(importedPlayers);


      setPlayers(normalizedPlayers);
      setSelectedPlayer(null);
      setSearch("");


      localStorage.setItem(
        "players",
        JSON.stringify(normalizedPlayers)
      );


      window.alert(
        `Imported ${normalizedPlayers.length} players successfully.`
      );
    } catch (errors) {
      const message =
        Array.isArray(errors)
          ? errors.join("\n")
          : String(errors);


      window.alert(
        `CSV import failed:\n\n${message}`
      );
    }
  };


  /* ===========================
     Render
  =========================== */

  return (
    <>
      <Header
        onReset={resetPlayers}
        onExport={handleExportCsv}
        onImport={handleImportCsv}
      />


      <SearchBar
        value={search}
        onChange={setSearch}
      />


      <div className="main-layout">
        <DndContext
          collisionDetection={
            closestCenter
          }
          onDragEnd={handleDragEnd}
        >
          <div className="board">
            {positions.map(
              (position) => (
                <PositionColumn
                  key={position}
                  title={position}
                  players={
                    players.filter(
                      (player) =>
                        player.position ===
                          position &&
                        player.name
                          .toLowerCase()
                          .includes(
                            search.toLowerCase()
                          )
                    )
                  }
                  onPlayerClick={
                    setSelectedPlayer
                  }
                  selectedPlayer={
                    selectedPlayer
                  }
                />
              )
            )}
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