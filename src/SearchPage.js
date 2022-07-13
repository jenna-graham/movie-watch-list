import { useState, useEffect } from 'react';
import { useDataContext } from './DataProvider';
import MovieList from './MovieList';
import { searchMovies } from './services/fetch-utils';

export default function SearchPage() {
  const { handleMovieSearch, movies, loading, setMovies } = useDataContext();
  const [title, setTitle] = useState('');
  console.log(movies);
  useEffect(() => {
    async function fetchMovies() {
      const newMovies = await searchMovies('Jaws');
      console.log(newMovies);
      setMovies(newMovies);
    }
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <section>
        <input onChange={(e) => setTitle(e.target.value)} />
        <button onClick={() => handleMovieSearch(title)}>Search Movie</button>
      </section>
      <div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}
