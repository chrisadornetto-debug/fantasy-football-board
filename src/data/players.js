import teamByeWeeks from "./teams";

const getStartingTier = (positionRank) => {
  if (positionRank <= 2) return 1;
  if (positionRank <= 5) return 2;

  return 3;
};

const basePlayers = [
  // ===========================
  // Quarterbacks
  // ===========================

  {
    id: 1,
    name: "Josh Allen",
    team: "BUF",
    position: "QB",
    positionRank: 1,
  },
  {
    id: 2,
    name: "Lamar Jackson",
    team: "BAL",
    position: "QB",
    positionRank: 2,
  },
  {
    id: 7,
    name: "Jayden Daniels",
    team: "WAS",
    position: "QB",
    positionRank: 3,
  },
  {
    id: 8,
    name: "Joe Burrow",
    team: "CIN",
    position: "QB",
    positionRank: 4,
  },
  {
    id: 9,
    name: "Drake Maye",
    team: "NE",
    position: "QB",
    positionRank: 5,
  },
  {
    id: 6,
    name: "Jalen Hurts",
    team: "PHI",
    position: "QB",
    positionRank: 6,
  },
  {
    id: 10,
    name: "Dak Prescott",
    team: "DAL",
    position: "QB",
    positionRank: 7,
  },
  {
    id: 11,
    name: "Justin Herbert",
    team: "LAC",
    position: "QB",
    positionRank: 8,
  },

  // ===========================
  // Running Backs
  // ===========================

  {
    id: 12,
    name: "Jahmyr Gibbs",
    team: "DET",
    position: "RB",
    positionRank: 1,
  },
  {
    id: 3,
    name: "Bijan Robinson",
    team: "ATL",
    position: "RB",
    positionRank: 2,
  },
  {
    id: 13,
    name: "Christian McCaffrey",
    team: "SF",
    position: "RB",
    positionRank: 3,
  },
  {
    id: 14,
    name: "Jonathan Taylor",
    team: "IND",
    position: "RB",
    positionRank: 4,
  },
  {
    id: 15,
    name: "James Cook",
    team: "BUF",
    position: "RB",
    positionRank: 5,
  },
  {
    id: 16,
    name: "Saquon Barkley",
    team: "PHI",
    position: "RB",
    positionRank: 6,
  },
  {
    id: 17,
    name: "De'Von Achane",
    team: "MIA",
    position: "RB",
    positionRank: 7,
  },
  {
    id: 18,
    name: "Ashton Jeanty",
    team: "LV",
    position: "RB",
    positionRank: 8,
  },

  // ===========================
  // Wide Receivers
  // ===========================

  {
    id: 4,
    name: "Ja'Marr Chase",
    team: "CIN",
    position: "WR",
    positionRank: 1,
  },
  {
    id: 19,
    name: "Puka Nacua",
    team: "LAR",
    position: "WR",
    positionRank: 2,
  },
  {
    id: 20,
    name: "Jaxon Smith-Njigba",
    team: "SEA",
    position: "WR",
    positionRank: 3,
  },
  {
    id: 21,
    name: "Amon-Ra St. Brown",
    team: "DET",
    position: "WR",
    positionRank: 4,
  },
  {
    id: 22,
    name: "Justin Jefferson",
    team: "MIN",
    position: "WR",
    positionRank: 5,
  },
  {
    id: 23,
    name: "CeeDee Lamb",
    team: "DAL",
    position: "WR",
    positionRank: 6,
  },
  {
    id: 24,
    name: "Drake London",
    team: "ATL",
    position: "WR",
    positionRank: 7,
  },
  {
    id: 25,
    name: "Nico Collins",
    team: "HOU",
    position: "WR",
    positionRank: 8,
  },

  // ===========================
  // Tight Ends
  // ===========================

  {
    id: 5,
    name: "Brock Bowers",
    team: "LV",
    position: "TE",
    positionRank: 1,
  },
  {
    id: 26,
    name: "Trey McBride",
    team: "ARI",
    position: "TE",
    positionRank: 2,
  },
  {
    id: 27,
    name: "Colston Loveland",
    team: "CHI",
    position: "TE",
    positionRank: 3,
  },
  {
    id: 28,
    name: "Tyler Warren",
    team: "IND",
    position: "TE",
    positionRank: 4,
  },
  {
    id: 29,
    name: "Harold Fannin",
    team: "CLE",
    position: "TE",
    positionRank: 5,
  },
  {
    id: 30,
    name: "Tucker Kraft",
    team: "GB",
    position: "TE",
    positionRank: 6,
  },
  {
    id: 31,
    name: "Sam LaPorta",
    team: "DET",
    position: "TE",
    positionRank: 7,
  },
  {
    id: 32,
    name: "Kyle Pitts",
    team: "ATL",
    position: "TE",
    positionRank: 8,
  },
];

const players = basePlayers.map((player) => ({
  id: player.id,
  name: player.name,
  team: player.team,
  position: player.position,

  positionRank: player.positionRank,
  tier:
    player.tier ??
    getStartingTier(player.positionRank),

  adp: player.adp ?? null,
  byeWeek:
    player.byeWeek ??
    teamByeWeeks[player.team] ??
    null,

  offensiveCoordinatorRank:
    player.offensiveCoordinatorRank ?? null,

  offensiveLineRank:
    player.offensiveLineRank ?? null,

  strengthOfScheduleRank:
    player.strengthOfScheduleRank ?? null,

  injuryProne: player.injuryProne ?? false,

rbbc: player.rbbc ?? false,
badQB: player.badQB ?? false,
badWRs: player.badWRs ?? false,

  notes: player.notes ?? "",
}));

export default players;