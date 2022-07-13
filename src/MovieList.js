// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useDataContext } from './DataProvider';
// import { searchMovies } from './services/fetch-utils';

export default function MovieList({ movies }) {
  const { URL } = useDataContext();
  return (
    <div className="movies-list">
      {movies &&
        movies.length &&
        movies.map((movie, i) => {
          return (
            <div className="movie-item" key={movie.title + i}>
              <h2>{movie.title}</h2>
              <img src={`${URL}${movie.poster_path}`} />
            </div>
          );
        })}
    </div>
  );
}
