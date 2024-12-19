import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../features/movies/moviesSlice";
import { addToWatchlist } from "../features/watchlist/watchlistSlice";
import { addToFavorites } from "../features/favourites/favoritesSlice";

const Moviecard = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get movieId from URL parameters

  // Access movie details and loading state from Redux store
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const error = useSelector((state) => state.movies.error);

  // Fetch movie details on component mount
  useEffect(() => {
    dispatch(fetchMovieDetails(id)); // Use fetchMovieDetails thunk correctly
  }, [dispatch, id]);

  // Fallback while loading
  if (isLoading) {
    return <p className="movie-card__loading">Loading movie details...</p>;
  }

  // Fallback on error
  if (error) {
    return <p className="movie-card__error">Error: {error}</p>;
  }

  // Fallback if movieDetails is not available
  if (!movieDetails || Object.keys(movieDetails).length === 0) {
    return (
      <p className="movie-card__fallback">
        No details available for this movie.
      </p>
    );
  }

  return (
    <div className="movie-details bg-gray-100 min-h-screen">
      <div className="movie-details__header relative">
        {/* Movie Poster */}
        <img
          src={
            movieDetails.backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`
              : "https://via.placeholder.com/1280x720?text=No+Image"
          }
          alt={movieDetails.title || "No Title Available"}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h2 className="text-4xl font-semibold">
            {movieDetails.title || "Untitled Movie"}
          </h2>
          <p className="mt-2 text-lg">
            {movieDetails.release_date || "Release Date: Unknown"}
          </p>
        </div>
      </div>

      <div className="movie-details__body p-6">
        {/* Movie Overview */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Overview
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            {movieDetails.overview || "No description available."}
          </p>
        </section>

        {/* Movie Details */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Details</h3>
          <div className="space-y-3">
            <p>
              <strong>Genres:</strong>{" "}
              {movieDetails.genres?.length
                ? movieDetails.genres.map((genre) => genre.name).join(", ")
                : "Unknown"}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              {movieDetails.vote_average !== undefined
                ? movieDetails.vote_average
                : "N/A"}
            </p>
            <p>
              <strong>Release Date:</strong>{" "}
              {movieDetails.release_date || "Unknown"}
            </p>
            <p>
              <strong>Status:</strong> {movieDetails.status || "Unknown"}
            </p>
            <p>
              <strong>Tagline:</strong>{" "}
              {movieDetails.tagline || "No tagline available."}
            </p>
          </div>
        </section>

        {/* Additional Movie Data */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Additional Info
          </h3>
          <div className="space-y-3">
            <p>
              <strong>Budget:</strong> $
              {movieDetails.budget?.toLocaleString() || "N/A"}
            </p>
            <p>
              <strong>Revenue:</strong> $
              {movieDetails.revenue?.toLocaleString() || "N/A"}
            </p>
            <p>
              <strong>Runtime:</strong>{" "}
              {movieDetails.runtime ? `${movieDetails.runtime} minutes` : "N/A"}
            </p>
            <p>
              <strong>Original Language:</strong>{" "}
              {movieDetails.original_language || "Unknown"}
            </p>
            <p>
              <strong>IMDB ID:</strong>{" "}
              <a
                href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
                target="_blank"
                className="text-blue-500"
              >
                {movieDetails.imdb_id}
              </a>
            </p>
          </div>
        </section>

        {/* Production Companies */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Production Companies
          </h3>
          <div className="space-y-2">
            {movieDetails.production_companies?.length ? (
              movieDetails.production_companies.map((company) => (
                <p key={company.id}>
                  <strong>{company.name}</strong> - {company.origin_country}
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                      alt={company.name}
                      className="inline-block ml-2"
                      style={{ width: 50 }}
                    />
                  )}
                </p>
              ))
            ) : (
              <p>No production companies listed</p>
            )}
          </div>
        </section>

        {/* Add to Watchlist and Favorites */}
        <section>
          <div className="flex gap-4">
            <button
              className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300"
              onClick={() => dispatch(addToWatchlist(movieDetails))}
            >
              Add to Watchlist
            </button>
            <button
              className="bg-red-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-red-700 transition-all duration-300"
              onClick={() => dispatch(addToFavorites(movieDetails))}
            >
              Add to Favorites
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Moviecard;
