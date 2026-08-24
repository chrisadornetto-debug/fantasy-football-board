import Papa from "papaparse";

export const CSV_FIELDS = [
  "id",
  "name",
  "team",
  "position",
  "positionRank",
  "tier",
  "adp",
  "byeWeek",
  "offensiveCoordinatorRank",
  "offensiveLineRank",
  "strengthOfScheduleRank",
  "injuryProne",
  "rbbc",
  "badQB",
  "badWRs",
  "fade",
  "target",
  "drafted",
  "notes",
];

const VALID_POSITIONS = ["QB", "RB", "WR", "TE"];

const nullableNumber = (value) => {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return null;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : null;
};

const parseBoolean = (value) => {
  if (value === true) return true;
  if (value === false) return false;

  const normalized = String(value)
    .trim()
    .toLowerCase();

  return ["true", "yes", "1", "y"].includes(
    normalized
  );
};

const validRating = (value) => {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return true;
  }

  return [1, 2, 3].includes(Number(value));
};


export const exportPlayersToCsv = (players) => {
  const rows = players.map((player) => ({
  id: player.id,
  name: player.name,
  team: player.team,
  position: player.position,
  positionRank: player.positionRank,
  tier: player.tier,

  adp: player.adp ?? "",
  byeWeek: player.byeWeek ?? "",

  offensiveCoordinatorRank:
    player.offensiveCoordinatorRank ?? "",

  offensiveLineRank:
    player.offensiveLineRank ?? "",

  strengthOfScheduleRank:
    player.strengthOfScheduleRank ?? "",

  injuryProne: player.injuryProne
    ? "true"
    : "false",

  rbbc: player.rbbc
    ? "true"
    : "false",

  badQB: player.badQB
    ? "true"
    : "false",

  badWRs: player.badWRs
    ? "true"
    : "false",

  fade: player.fade
    ? "true"
    : "false",

  target: player.target
    ? "true"
    : "false",

  drafted: player.drafted
    ? "true"
    : "false",

  notes: player.notes ?? "",
}));

  const csv = Papa.unparse(rows, {
    columns: CSV_FIELDS,
  });

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "fantasy-football-board.csv";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};


export const importPlayersFromCsv = (file) =>
  new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: "greedy",

      transformHeader: (header) =>
        header
          .replace(/^\uFEFF/, "")
          .trim(),

      complete: (results) => {
        const errors = [];

        if (results.errors.length > 0) {
          results.errors.forEach((error) => {
            errors.push(
              `CSV error: ${error.message}`
            );
          });
        }

        const headers =
          results.meta.fields ?? [];

        const missingFields =
          CSV_FIELDS.filter(
            (field) =>
              !headers.includes(field)
          );

        if (missingFields.length > 0) {
          errors.push(
            `Missing columns: ${missingFields.join(
              ", "
            )}`
          );
        }

        const ids = new Set();

        const players = results.data.map(
          (row, index) => {
            const rowNumber = index + 2;

            const id = Number(row.id);
            const positionRank = Number(
              row.positionRank
            );
            const tier = Number(row.tier);

            if (
              !Number.isInteger(id) ||
              id <= 0
            ) {
              errors.push(
                `Row ${rowNumber}: invalid id`
              );
            }

            if (ids.has(id)) {
              errors.push(
                `Row ${rowNumber}: duplicate id ${id}`
              );
            }

            ids.add(id);

            if (!row.name?.trim()) {
              errors.push(
                `Row ${rowNumber}: name is required`
              );
            }

            const position = row.position
              ?.trim()
              .toUpperCase();

            if (
              !VALID_POSITIONS.includes(
                position
              )
            ) {
              errors.push(
                `Row ${rowNumber}: position must be QB, RB, WR, or TE`
              );
            }

            if (
              !Number.isInteger(positionRank) ||
              positionRank < 1
            ) {
              errors.push(
                `Row ${rowNumber}: invalid positionRank`
              );
            }

            if (
              !Number.isInteger(tier) ||
              tier < 1 ||
              tier > 8
            ) {
              errors.push(
                `Row ${rowNumber}: tier must be 1-8`
              );
            }

            if (
              !validRating(
                row.offensiveCoordinatorRank
              )
            ) {
              errors.push(
                `Row ${rowNumber}: Offensive Coordinator Rank must be 1-3 or blank`
              );
            }

            if (
              !validRating(
                row.offensiveLineRank
              )
            ) {
              errors.push(
                `Row ${rowNumber}: Offensive Line Rank must be 1-3 or blank`
              );
            }

            if (
              !validRating(
                row.strengthOfScheduleRank
              )
            ) {
              errors.push(
                `Row ${rowNumber}: Strength of Schedule Rank must be 1-3 or blank`
              );
            }

return {
  id,
  name: row.name?.trim() ?? "",
  team: row.team
    ?.trim()
    .toUpperCase(),
  position,

  positionRank,
  tier,

  adp: nullableNumber(row.adp),

  byeWeek: nullableNumber(
    row.byeWeek
  ),

  offensiveCoordinatorRank:
    nullableNumber(
      row.offensiveCoordinatorRank
    ),

  offensiveLineRank:
    nullableNumber(
      row.offensiveLineRank
    ),

  strengthOfScheduleRank:
    nullableNumber(
      row.strengthOfScheduleRank
    ),

  injuryProne: parseBoolean(
    row.injuryProne
  ),

  rbbc: parseBoolean(
    row.rbbc
  ),

  badQB: parseBoolean(
    row.badQB
  ),

  badWRs: parseBoolean(
    row.badWRs
  ),

  fade: parseBoolean(
    row.fade
  ),

  target: parseBoolean(
    row.target
  ),

  drafted: parseBoolean(
    row.drafted
  ),

  notes: row.notes ?? "",
};
          }
        );

        if (errors.length > 0) {
          reject(errors);
          return;
        }

        resolve(players);
      },

      error: (error) => {
        reject([
          `Unable to read CSV: ${error.message}`,
        ]);
      },
    });
  });