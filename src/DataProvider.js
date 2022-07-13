import { useState, useContext, createContext } from 'react';
import { getUser, searchMovies } from './services/fetch-utils';

const URL = 'https://image.tmdb.org/t/p/original/';
const DataContext = createContext();

export default function DataProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState([]);
  //   const [singleMovie, setSingleMovie] = useState([]);
  const [movies, setMovies] = useState([]);
  console.log(loading);

  const stateAndSetters = {
    user,
    setUser,
    URL,
    handleMovieSearch,
    loading,
    movies,
    setMovies,
  };

  async function handleMovieSearch(title) {
    setLoading(true);
    const movies = await searchMovies(title);
    setLoading(false);
    setMovies(movies);
  }

  return <DataContext.Provider value={stateAndSetters}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}
