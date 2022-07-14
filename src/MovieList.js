import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from './DataProvider';
// import { searchMovies } from './services/fetch-utils';

export default function MovieList({ movies }) {
  const { handleFetchFavorites, URL, favorites, handleAddFavorite, handleDeleteFavorite } =
    useDataContext();

  useEffect(() => {
    if (!favorites) handleFetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="movies-list">
      {movies &&
        movies.length &&
        movies.map((movie, i) => {
          const alreadyFave =
            favorites && favorites.find((favorite) => favorite.title === movie.title);
          return (
            <div className="movie-item" key={movie.title + i}>
              <h2>{movie.title}</h2>
              <img src={`${URL}${movie.poster_path}`} />
              <Link to={`/movies/${movie.api_id || movie.id}`}>Click for more details</Link>
              <br/>
              <button className='heart-button'
                onClick={() =>
                  alreadyFave
                    ? handleDeleteFavorite(alreadyFave.id)
                    : handleAddFavorite({
                        // eslint-disable-next-line indent
                        api_id: movie.id,
                        // eslint-disable-next-line indent
                        poster_path: movie.poster_path,
                        // eslint-disable-next-line indent
                        title: movie.title,
                        // eslint-disable-next-line indent
                      })
                }
              >
                {alreadyFave ? '❤️' : '♡'}
              </button>
            </div>
          );
        })}
    </div>
  );
}
