export const matchesSearch = (playerName, searchValue) => {
  const trimmedValue = searchValue.trim();

  if (!trimmedValue) {
    return true;
  }

  try {
    const pattern = new RegExp(trimmedValue, "i");
    return pattern.test(playerName);
  } catch {
    return playerName
      .toLowerCase()
      .includes(trimmedValue.toLowerCase());
  }
};
