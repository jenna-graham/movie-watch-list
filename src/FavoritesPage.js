import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from './DataProvider';
import MovieList from './MovieList';

export default function FavoritesPage() {
  const { handleFetchFavorites, favorites, loading } = useDataContext();
  const { id } = useParams();
  useEffect(() => {
    handleFetchFavorites(id);
  }, [id]); // eslint-disable-line
  return <div>{loading ? <h1>Loading!</h1> : <MovieList movies={favorites} />}</div>;
}
