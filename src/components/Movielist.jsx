import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../features/watchlist/watchlistSlice";
import { addToFavorites } from "../features/favourites/favoritesSlice";
import { Link } from "react-router-dom";

const MovieList = () => {
  const dispatch = useDispatch();

  // Access movies from Redux store
  const movies = useSelector((state) => state.movies.movies);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-md overflow-hidden flex flex-col items-center p-4 transition-transform transform hover:scale-105"
          >
            {/* Link to navigate to Movie Details */}
            <Link to={`/movie/${movie.id}`} className="w-full text-center">
              {/* Movie Poster */}
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title || "No Title Available"}
                className="w-full h-60 object-cover rounded-md"
              />

              {/* Movie Title */}
              <h3 className="text-lg font-bold mt-3 text-gray-800 truncate">
                {movie.title || "Untitled Movie"}
              </h3>

              {/* Movie Description */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {movie.overview
                  ? `${movie.overview.substring(0, 100)}...`
                  : "No description available."}
              </p>
            </Link>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4 w-full">
              <button
                onClick={() => dispatch(addToWatchlist(movie))}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Watchlist
              </button>
              <button
                onClick={() => dispatch(addToFavorites(movie))}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                ★ Favorites
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-700 font-semibold">
          No movies found. Try searching for something!
        </p>
      )}
    </div>
  );
};

export default MovieList;
