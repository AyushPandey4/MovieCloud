import { createSlice } from "@reduxjs/toolkit";
import { saveFavorites, loadFavorites } from "./favoritesUtils";
// Initial state
const initialState = {
  favorites: loadFavorites(), // Load favorites from localStorage
};

// Create the slice
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Action to add a movie to favorites
    addToFavorites(state, action) {
      const movie = action.payload;
      // Check if the movie is already in the favorites
      const exists = state.favorites.some((item) => item.id === movie.id);
      if (!exists) {
        state.favorites.push(movie);
        saveFavorites(state.favorites); // Save to localStorage
      }
    },
    // Action to remove a movie from favorites
    removeFromFavorites(state, action) {
      const movieId = action.payload;
      state.favorites = state.favorites.filter((item) => item.id !== movieId);
      saveFavorites(state.favorites); // Save to localStorage
    },
  },
});

// Export actions
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

// Export reducer
export default favoritesSlice.reducer;
