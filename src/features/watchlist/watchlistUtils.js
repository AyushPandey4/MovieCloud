const WATCHLIST_KEY = "watchlist";

export const saveWatchlist = (watchlist) => {
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  } catch (error) {
    console.error("Failed to save watchlist:", error);
  }
};

export const loadWatchlist = () => {
  try {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load watchlist:", error);
    return [];
  }
};
