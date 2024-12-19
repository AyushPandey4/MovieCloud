import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWatchlist } from "../features/watchlist/watchlistSlice";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const dispatch = useDispatch();

  // Access watchlist from Redux store
  const watchlist = useSelector((state) => state.watchlist.watchlist);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
      {watchlist.length > 0 ? (
        watchlist.map((movie) => (
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
            </Link>

            {/* Remove Button */}
            <button
              onClick={() => dispatch(removeFromWatchlist(movie.id))}
              className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700"
            >
              Remove from Watchlist
            </button>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-700 font-semibold">
          Your watchlist is empty. Start adding movies!
        </p>
      )}
    </div>
  );
};

export default Watchlist;
