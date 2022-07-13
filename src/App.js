import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import { useDataContext } from './DataProvider';
import { logout } from './services/fetch-utils';
import AuthPage from './AuthPage';
import SearchPage from './SearchPage';
import DetailPage from './DetailPage';
import FavoritesPage from './FavoritesPage';

export default function App() {
  const { user, setUser } = useDataContext();

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {user && <li> Welcome {user.email}!</li>}
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/favorites">Your Favorite Movies</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/movies" /> : <AuthPage />}
          </Route>
          <Route exact path="/movies">
            {!user ? <Redirect to="/" /> : <SearchPage />}
          </Route>
          <Route exact path="/movies/:id">
            {!user ? <Redirect to="/" /> : <DetailPage />}
          </Route>
          <Route exact path="/favorites">
            {!user ? <Redirect to="/" /> : <FavoritesPage />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
