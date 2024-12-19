const FAVORITES_KEY = "favorites";

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites:", error);
  }
};

export const loadFavorites = () => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
};
