import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Configuration
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

// Async Thunks
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query },
      });
      // console.log(response.data.results);      // debug
      return response.data.results; // Return movies list
    } catch (error) {
      return rejectWithValue("Failed to fetch movies. Please try again later.");
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: { api_key: API_KEY },
      });
      // console.log(response.data);   //debug
      return response.data; // Return movie details
    } catch (error) {
      return rejectWithValue(
        "Failed to fetch movie details. Please try again later."
      );
    }
  }
);

// Initial State
const initialState = {
  movies: [],
  movieDetails: {},
  isLoading: false,
  error: null,
};

// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovies(state) {
      state.movies = [];
      state.isLoading = false;
      state.error = null;
    },
    clearMovieDetails(state) {
      state.movieDetails = {};
    },
  },
  extraReducers: (builder) => {
    // Fetch Movies
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch Movie Details
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Actions
export const { clearMovies, clearMovieDetails } = moviesSlice.actions;

// Reducer
export default moviesSlice.reducer;
