import { useState, useEffect } from 'react';
import { useDataContext } from './DataProvider';
import MovieList from './MovieList';
import { searchMovies } from './services/fetch-utils';

export default function SearchPage() {
  const { handleMovieSearch, movies, setMovies } = useDataContext();
  const [title, setTitle] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      const newMovies = await searchMovies('A');

      setMovies(newMovies);
    }
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <section className='search-bar'>
        <input onChange={(e) => setTitle(e.target.value)} />
        <button onClick={() => handleMovieSearch(title)}>Search Movie</button>
      </section>
      <div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}
