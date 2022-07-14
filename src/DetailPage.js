import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from './DataProvider';

export default function DetailPage() {
  const { handleFetchMovie, movie, loading, URL } = useDataContext();
  const { id } = useParams();

  useEffect(() => {
    handleFetchMovie(id);
  }, [id]); // eslint-disable-line

  return (
    <div>
      {loading ? (
        <h1>loading. . .</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <img className="movie-detail" src={`${URL}${movie.poster_path}`} />
          <p>{movie.overview}</p>
          {JSON.stringify(movie)}
        </div>
      )}
    </div>
  );
}
