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
    rank: 31,
    positionRank: 1,
  },
  {
    id: 2,
    name: "Lamar Jackson",
    team: "BAL",
    position: "QB",
    rank: 38,
    positionRank: 2,
  },
  {
    id: 7,
    name: "Jayden Daniels",
    team: "WAS",
    position: "QB",
    rank: 48,
    positionRank: 3,
  },
  {
    id: 8,
    name: "Joe Burrow",
    team: "CIN",
    position: "QB",
    rank: 55,
    positionRank: 4,
  },
  {
    id: 9,
    name: "Drake Maye",
    team: "NE",
    position: "QB",
    rank: 58,
    positionRank: 5,
  },
  {
    id: 6,
    name: "Jalen Hurts",
    team: "PHI",
    position: "QB",
    rank: 63,
    positionRank: 6,
  },
  {
    id: 10,
    name: "Dak Prescott",
    team: "DAL",
    position: "QB",
    rank: 72,
    positionRank: 7,
  },
  {
    id: 11,
    name: "Justin Herbert",
    team: "LAC",
    position: "QB",
    rank: 82,
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
    rank: 1,
    positionRank: 1,
  },
  {
    id: 3,
    name: "Bijan Robinson",
    team: "ATL",
    position: "RB",
    rank: 2,
    positionRank: 2,
  },
  {
    id: 13,
    name: "Christian McCaffrey",
    team: "SF",
    position: "RB",
    rank: 6,
    positionRank: 3,
  },
  {
    id: 14,
    name: "Jonathan Taylor",
    team: "IND",
    position: "RB",
    rank: 8,
    positionRank: 4,
  },
  {
    id: 15,
    name: "James Cook",
    team: "BUF",
    position: "RB",
    rank: 11,
    positionRank: 5,
  },
  {
    id: 16,
    name: "Saquon Barkley",
    team: "PHI",
    position: "RB",
    rank: 12,
    positionRank: 6,
  },
  {
    id: 17,
    name: "De'Von Achane",
    team: "MIA",
    position: "RB",
    rank: 13,
    positionRank: 7,
  },
  {
    id: 18,
    name: "Ashton Jeanty",
    team: "LV",
    position: "RB",
    rank: 15,
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
    rank: 3,
    positionRank: 1,
  },
  {
    id: 19,
    name: "Puka Nacua",
    team: "LAR",
    position: "WR",
    rank: 4,
    positionRank: 2,
  },
  {
    id: 20,
    name: "Jaxon Smith-Njigba",
    team: "SEA",
    position: "WR",
    rank: 5,
    positionRank: 3,
  },
  {
    id: 21,
    name: "Amon-Ra St. Brown",
    team: "DET",
    position: "WR",
    rank: 7,
    positionRank: 4,
  },
  {
    id: 22,
    name: "Justin Jefferson",
    team: "MIN",
    position: "WR",
    rank: 9,
    positionRank: 5,
  },
  {
    id: 23,
    name: "CeeDee Lamb",
    team: "DAL",
    position: "WR",
    rank: 10,
    positionRank: 6,
  },
  {
    id: 24,
    name: "Drake London",
    team: "ATL",
    position: "WR",
    rank: 14,
    positionRank: 7,
  },
  {
    id: 25,
    name: "Nico Collins",
    team: "HOU",
    position: "WR",
    rank: 16,
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
    rank: 17,
    positionRank: 1,
  },
  {
    id: 26,
    name: "Trey McBride",
    team: "ARI",
    position: "TE",
    rank: 25,
    positionRank: 2,
  },
  {
    id: 27,
    name: "Colston Loveland",
    team: "CHI",
    position: "TE",
    rank: 40,
    positionRank: 3,
  },
  {
    id: 28,
    name: "Tyler Warren",
    team: "IND",
    position: "TE",
    rank: 61,
    positionRank: 4,
  },
  {
    id: 29,
    name: "Harold Fannin",
    team: "CLE",
    position: "TE",
    rank: 77,
    positionRank: 5,
  },
  {
    id: 30,
    name: "Tucker Kraft",
    team: "GB",
    position: "TE",
    rank: 88,
    positionRank: 6,
  },
  {
    id: 31,
    name: "Sam LaPorta",
    team: "DET",
    position: "TE",
    rank: 92,
    positionRank: 7,
  },
  {
    id: 32,
    name: "Kyle Pitts",
    team: "ATL",
    position: "TE",
    rank: 97,
    positionRank: 8,
  },
];

const players = basePlayers.map((player) => ({
  ...player,

  tier: getStartingTier(player.positionRank),
  byeWeek: teamByeWeeks[player.team],

  adp: null,
  favorite: false,
  notes: "",

  offensiveCoordinator: "",
  offensiveRank: null,
}));

export default players;