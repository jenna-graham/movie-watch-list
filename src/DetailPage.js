import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from './DataProvider';

export default function DetailPage() {
  const { handleFetchMovie, singleMovie, loading, URL } = useDataContext();
  const { id } = useParams();

  useEffect(() => {
    handleFetchMovie(id);
  }, [id]); // eslint-disable-line

  return (
    <div>
      {loading ? (
        <h1>loading. . .</h1>
      ) : (
        <div className="movie-detail">
          <h1>{singleMovie.title}</h1>
          <img src={`${URL}${singleMovie.poster_path}`} />
          <p>{singleMovie.overview}</p>
        </div>
      )}
    </div>
  );
}
