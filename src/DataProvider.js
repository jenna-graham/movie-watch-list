import { useState, useContext, createContext } from 'react';
import {
  createFavorite,
  getUser,
  searchMovies,
  getFavorites,
  deleteFavorite,
  getMovie,
} from './services/fetch-utils';

const URL = 'https://image.tmdb.org/t/p/original/';
const DataContext = createContext();

export default function DataProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState([]);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(null);
  const [singleMovie, setSingleMovie] = useState([]);

  const stateAndSetters = {
    user,
    setUser,
    URL,
    handleMovieSearch,
    loading,
    movies,
    setMovies,
    favorites,
    handleAddFavorite,
    handleFetchFavorites,
    handleDeleteFavorite,
    singleMovie,
    handleFetchMovie,
  };

  async function handleMovieSearch(title) {
    setLoading(true);
    const movies = await searchMovies(title);
    setLoading(false);
    setMovies(movies);
  }
  async function handleFetchMovie(id) {
    setLoading(true);
    const movie = await getMovie(id);
    setLoading(false);
    setSingleMovie(movie);
  }
  async function handleAddFavorite(favorite) {
    setLoading(true);
    await createFavorite(favorite);
    const updatedFavorites = await getFavorites();
    setLoading(false);

    setFavorites(updatedFavorites);
  }
  async function handleFetchFavorites(id) {
    setLoading(true);
    const favorites = await getFavorites(id);
    setLoading(false);
    setFavorites(favorites);
  }
  async function handleDeleteFavorite(id) {
    setLoading(true);
    await deleteFavorite(id);
    const updatedFavorites = await getFavorites();
    setLoading(false);

    setFavorites(updatedFavorites);
  }

  return <DataContext.Provider value={stateAndSetters}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}
