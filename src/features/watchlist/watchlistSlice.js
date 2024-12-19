import { createSlice } from "@reduxjs/toolkit";
import { saveWatchlist, loadWatchlist } from "./watchlistUtils";
// Initial state
const initialState = {
  watchlist: loadWatchlist(), // Load watchlist from localStorage
};

// Create the slice
const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    // Action to add a movie to the watchlist
    addToWatchlist(state, action) {
      const movie = action.payload;
      // Check if the movie is already in the watchlist
      const exists = state.watchlist.some((item) => item.id === movie.id);
      if (!exists) {
        state.watchlist.push(movie);
        saveWatchlist(state.watchlist); // Save to localStorage
      }
    },
    // Action to remove a movie from the watchlist
    removeFromWatchlist(state, action) {
      const movieId = action.payload;
      state.watchlist = state.watchlist.filter((item) => item.id !== movieId);
      saveWatchlist(state.watchlist); // Save to localStorage
    },
  },
});

// Export actions
export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;

// Export reducer
export default watchlistSlice.reducer;
