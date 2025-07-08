import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

export default function SavedMoviesPage() {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user) {
      axios
       .get(`${BASE_URL}/saved/${user.id}`)
        .then(res => setMovies(res.data))
        .catch(err => console.error('❌ Failed to fetch saved movies:', err));
    }
  }, [user]);

  if (!user) return <div className="container mt-4">Login to view saved movies</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">🎬 Your Saved Movies</h3>
      <div className="row">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} saved={true} />
          ))
        ) : (
          <p>No saved movies found.</p>
        )}
      </div>
    </div>
  );
}
