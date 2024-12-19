import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/moviesSlice"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  // Local state for search input
  const [searchQuery, setSearchQuery] = useState("");

  // Access watchlist count
  const watchlistCount = useSelector(
    (state) => state.watchlist.watchlist.length
  );

  // Access favorites count
  const favoritesCount = useSelector(
    (state) => state.favorites.favorites.length
  );

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      dispatch(fetchMovies(trimmedQuery)); // Dispatch the async thunk
    }
    setSearchQuery("");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-700 p-4">
      <div className="flex flex-col sm:flex-row items-center justify-around">
        {/* Logo */}
        <Link
          to="/"
          className="text-yellow-400 text-2xl font-serif mb-4 sm:mb-0 "
        >
          Movie<span className="text-white">Cloud</span>
        </Link>

        {/* Search and Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-7 w-full sm:w-auto">
          <form
            onSubmit={handleSearch}
            className="flex gap-4 w-full sm:w-auto sm:justify-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full sm:w-96 p-2 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-700"
              disabled={!searchQuery.trim()} // Disable if search query is empty
            >
              Search
            </button>
          </form>

          <div className="flex flex-col text-center sm:flex-row gap-4 w-full sm:w-auto mt-4 sm:mt-0 sm:justify-center">
            <Link
              to="/watchlist"
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-200"
            >
              Watchlist ({watchlistCount})
            </Link>
            <Link
              to="/favourite"
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-200"
            >
              Favorites ({favoritesCount})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
