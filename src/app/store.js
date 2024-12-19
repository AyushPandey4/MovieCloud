import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";
import favoritesReducer from "../features/favourites/favoritesSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    watchlist: watchlistReducer,
    favorites: favoritesReducer,
  },
});

export default store;
