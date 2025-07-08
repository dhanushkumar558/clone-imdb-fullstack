import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import SearchFilterBar from '../components/SearchFilterBar';
import { useUser } from '../context/UserContext';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const { user } = useUser();

  const fetchMovies = async (params = {}) => {
    try {
      const res = await axios.get(`${BASE_URL}/movies`, { params });
      setMovies(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch movies:', err);
    }
  };

  const fetchSaved = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${BASE_URL}/saved/${user.id}`);
      const ids = res.data.map(m => m.id);
      setSavedIds(ids);
    } catch (err) {
      console.error('❌ Failed to fetch saved movies', err);
    }
  };

  useEffect(() => {
    fetchMovies();  // Initial load
    fetchSaved();   // Get saved movies
  }, [user]);

  return (
    <>
      <div className="container mt-4 homepage-fx">
        <h2 className="mb-4 text-center fw-bold text-primary" style={{ letterSpacing: '1px' }}>
          🍿 Discover Movies You’ll Love
        </h2>

        <div className="mb-4">
          <SearchFilterBar onChange={fetchMovies} />
        </div>

        <div className="row g-4">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              saved={savedIds.includes(movie.id)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .homepage-fx {
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 767px) {
          .homepage-fx h2 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </>
  );
}
